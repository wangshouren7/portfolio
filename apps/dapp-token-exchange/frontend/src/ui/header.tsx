import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="p-4 flex w-full items-center justify-between border-b">
      <h1>Dapp Token Exchange</h1>

      <div>
        <ConnectButton />
      </div>
    </header>
  );
};
