import { cn, type IComponentBaseProps, mp } from "@pfl-wsr/ui";
import React from "react";

const sizes = {
  sm: "loading-sm",
  md: "loading-md",
  lg: "loading-lg",
  xl: "loading-xl",
} as const;

interface ILoaderProps extends IComponentBaseProps {
  size?: keyof typeof sizes;
}

export const Loader: React.FC<ILoaderProps> = (props) => {
  return mp(
    props,
    <div className="flex justify-center">
      <span
        className={cn("loading loading-spinner", sizes[props.size ?? "md"])}
      ></span>
    </div>,
  );
};
