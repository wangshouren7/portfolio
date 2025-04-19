import nextConfig from "@pfl-wsr/configs/next";
import createNextIntlPlugin from "next-intl/plugin";

import { merge } from "lodash-es";
import { type NextConfig } from "next";

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: [
      "./src/i18n/messages/en.json",
      "./src/i18n/messages/zh.json",
    ],
  },
});

export default withNextIntl(
  merge({}, nextConfig, {
    webpack: (config, context) => {
      nextConfig.webpack?.(config, context);
      /** https://github.com/WalletConnect/walletconnect-monorepo/issues/4466#issuecomment-2520872647 */
      // config.externals.push("pino-pretty", "lokijs", "encoding");
      return config;
    },
  } satisfies NextConfig),
);
