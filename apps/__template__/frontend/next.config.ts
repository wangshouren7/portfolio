import nextConfig from "@pfl-wsr/configs/next";
import { merge } from "lodash-es";
import { type NextConfig } from "next";

export default merge(nextConfig, {} satisfies NextConfig);
