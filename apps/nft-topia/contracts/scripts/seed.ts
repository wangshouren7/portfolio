import hre from "hardhat";
import { vars } from "hardhat/config";

import { PinataSDK } from "pinata";
import { CHAIN_ID_TO_CONTRACT_CONFIG } from "..";
import { faker } from "@faker-js/faker";
import { parseEther } from "ethers";
import { readdir } from "fs/promises";
import { join } from "path";
import { readFileSync } from "fs";

const ipfsClient = new PinataSDK({
  pinataJwt: vars.get("PINATA_JWT"),
  pinataGateway: vars.get("NEXT_PUBLIC_PINATA_GATEWAY_URL"),
});

const uploadToken = async (file: string) => {
  const blob = new Blob([readFileSync(file)]);

  const { cid } = await ipfsClient.upload.public.file(
    new File([blob], "image.jpg", { type: "image/jpeg" }),
  );
  const fileUrl = await ipfsClient.gateways.public.convert(cid);

  /** Agreed data structure */
  const tokenJSON = {
    name: faker.commerce.productName(),
    description: faker.lorem.paragraphs({ min: 1, max: 3 }),
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
  const [creator, buyer] = await hre.ethers.getSigners();
  const nftMarketPlace = await hre.ethers.getContractAt(
    "NFTMarketplace",
    CHAIN_ID_TO_CONTRACT_CONFIG[31337].NFTMarketplace.address,
  );

  const listingPrice = await nftMarketPlace.getListingPrice();
  const files = (await readdir(join(__dirname, "./seed-images"))).map((x) =>
    join(__dirname, "./seed-images", x),
  );
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
