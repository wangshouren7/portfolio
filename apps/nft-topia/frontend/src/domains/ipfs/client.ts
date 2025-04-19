"server only";

import { PinataSDK } from "pinata";
import { lg } from "../log";

lg.log("ipfsClient", {
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL,
});

export const ipfsClient = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL,
});
