import hre from "hardhat";
import { vars } from "hardhat/config";
import { OpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";

import { PinataSDK } from "pinata";
import { CHAIN_ID_TO_CONTRACT_CONFIG } from "..";
import { parseEther } from "ethers";
import { readdir } from "fs/promises";
import { join } from "path";
import { readFileSync } from "fs";
import { z } from "zod";

const ipfsClient = new PinataSDK({
  pinataJwt: vars.get("PINATA_JWT"),
  pinataGateway: vars.get("NEXT_PUBLIC_PINATA_GATEWAY_URL"),
});

const uploadToken = async (file: string) => {
  const openai = new OpenAI({
    apiKey: vars.get("OPENAI_API_KEY"),
    baseURL: vars.get("OPENAI_BASE_URL"),
  });

  const blob = new Blob([readFileSync(file)]);

  const { cid } = await ipfsClient.upload.public.file(
    new File([blob], "image.jpg", { type: "image/jpeg" }),
  );
  const fileUrl = await ipfsClient.gateways.public.convert(cid);

  const MathReasoning = z.object({
    description: z.string(),
    name: z.string(),
  });
  const response = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "I am going to create a NFT based on this image please help me generate name and description.",
          },
          {
            type: "image_url",
            image_url: {
              url: fileUrl,
            },
          },
        ],
      },
    ],
    response_format: zodResponseFormat(MathReasoning, "math_reasoning"),
  });

  const result = response.choices[0].message;
  const description = result.parsed?.description;
  const name = result.parsed?.name;

  /** Agreed data structure */
  const tokenJSON = {
    name,
    description,
    file: fileUrl,
    price: 100,
  };

  const { cid: tokenJSONCID } = await ipfsClient.upload.public.json(tokenJSON);
  const tokenUrl = await ipfsClient.gateways.public.convert(tokenJSONCID);

  return [
    tokenUrl,
    BigInt(parseEther(tokenJSON.price.toString())),
    tokenJSON,
  ] as const;
};

async function main() {
  const network = await hre.ethers.provider.getNetwork();
  const chainId = network.chainId.toString();
  const nftMarketPlace = await hre.ethers.getContractAt(
    "NFTMarketplace",
    CHAIN_ID_TO_CONTRACT_CONFIG[
      chainId as unknown as keyof typeof CHAIN_ID_TO_CONTRACT_CONFIG
    ].NFTMarketplace.address,
  );

  const [creator, buyer] = await hre.ethers.getSigners();

  if (!creator) {
    throw new Error("Creator not found");
  }

  const listingPrice = await nftMarketPlace.getListingPrice();
  const files = (await readdir(join(__dirname, "./seed-images")))
    .filter((x) => x.endsWith(".jpg"))
    .map((x) => join(__dirname, "./seed-images", x));
  for (let i = 0; i < files.length; i++) {
    try {
      const [tokenUrl, price, tokenJSON] = await uploadToken(files[i]);
      await nftMarketPlace.connect(creator).createToken(tokenUrl, price, {
        value: listingPrice,
      });
      console.log(`A token was created by ${creator.address}`);
      console.log(JSON.stringify(tokenJSON, null, 2));
    } catch (error) {
      console.error(`Error creating token:`, error);
    }
  }

  const marketItems = await nftMarketPlace.fetchMarketItems();

  if (!buyer) {
    console.warn("No buyer found, skipping buy");
    return;
  }

  // buyer buys tokens
  for (let i = 0; i < 3; i++) {
    const tokenId = marketItems[i].tokenId;
    await nftMarketPlace.connect(buyer).createMarketSale(tokenId, {
      value: marketItems[i].price,
    });
    console.log(`Token ${tokenId} bought by ${buyer.address}`);
  }
}

main();
