"use server";

export async function uploadToIpfs(file: File) {
  const form = new FormData();
  form.append("file", file);
  const token = process.env.PINATA_JWT;
  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });
  const { IpfsHash } = (await res.json()) as {
    IpfsHash: string;
    PinSize: number;
    Timestamp: string;
    ID: string;
    Name: string;
    NumberOfFiles: number;
    MimeType: string;
    GroupId: null;
    Keyvalues: null;
    isDuplicate: boolean;
  };

  return IpfsHash;
}
