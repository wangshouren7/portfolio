import { mp } from "@pfl-wsr/ui";
import React from "react";

export const InputEther = ({
  className,
  style,
  ...props
}: React.ComponentProps<"input">) => {
  return mp(
    { className, style },
    <div className="input w-full">
      <input placeholder="0.001" type="number" {...props} />
      <span className="text-sm text-muted-foreground">ETH</span>
    </div>,
  );
};
