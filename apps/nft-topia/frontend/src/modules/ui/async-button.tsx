import { type Button, mp, useAsyncFn } from "@pfl-wsr/ui";
import React, { type ComponentProps } from "react";

interface IAsyncButtonProps
  extends Omit<ComponentProps<typeof Button>, "onClick"> {
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => Promise<void> | void;
  loading?: boolean;
}

export const AsyncButton: React.FC<IAsyncButtonProps> = ({
  loading: propLoading,
  onClick: propOnClick,
  disabled: propDisabled,
  ...props
}) => {
  const [{ loading }, onClick] = useAsyncFn((e) =>
    Promise.resolve(propOnClick?.(e)),
  );

  const finalLoading = loading || propLoading;
  const finalDisabled = finalLoading || propDisabled;

  return mp(
    props,
    <button
      {...props}
      className="btn"
      disabled={finalDisabled}
      onClick={onClick}
    >
      {finalLoading && <span className="loading loading-spinner"></span>}
      {props.children}
    </button>,
  );
};
