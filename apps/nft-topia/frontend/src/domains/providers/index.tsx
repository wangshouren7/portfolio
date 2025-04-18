import React from "react";
import { ServerProviders } from "./server";
import { ClientProviders } from "./client";

interface IProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<IProvidersProps> = (props) => {
  return (
    <ServerProviders>
      <ClientProviders>{props.children}</ClientProviders>
    </ServerProviders>
  );
};
