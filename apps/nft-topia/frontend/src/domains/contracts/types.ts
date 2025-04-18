import { type marketItemToNft } from "./transformer";

export type INft = Exclude<
  Awaited<ReturnType<typeof marketItemToNft>>,
  undefined
>;
