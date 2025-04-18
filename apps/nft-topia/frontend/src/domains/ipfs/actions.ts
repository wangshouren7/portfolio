"use server";

import { ipfsClient } from "./client";
import { type ITokenJSON } from "./types";

export async function uploadFileToIpfs(file: File) {
  const { cid } = await ipfsClient.upload.public.file(file);
  const url = await ipfsClient.gateways.public.convert(cid);
  return url;
}

export async function uploadJsonToIpfs(json: any) {
  const { cid } = await ipfsClient.upload.public.json(json);
  const url = await ipfsClient.gateways.public.convert(cid);
  return url;
}

export async function uploadTokenJsonToIpfs(json: ITokenJSON) {
  return uploadJsonToIpfs(json);
}
