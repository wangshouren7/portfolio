export const pathnames = {
  home: () => "/",
  myNft: () => "/my-nfts",
  create: () => "/create-nft",
  listedNft: () => "/listed-nfts",
  detail: (tokenId: string) => `/detail/${tokenId}`,
};
