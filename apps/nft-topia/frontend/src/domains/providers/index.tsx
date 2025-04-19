"use client";

import React from "react";
import { ClientProviders } from "./client";

interface IProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<IProvidersProps> = (props) => {
  return <ClientProviders>{props.children}</ClientProviders>;
};
