import React from "react";
import { GitHubLogoIcon, type IComponentBaseProps, mp } from "@pfl-wsr/ui";

export const GithubLink: React.FC<
  IComponentBaseProps & {
    iconSize?: number;
  }
> = (props) => {
  return mp(
    props,
    <div className="flex items-center justify-center">
      <a href="https://github.com/wangshouren7/portfolio" target="_blank">
        <GitHubLogoIcon height={props.iconSize} width={props.iconSize} />
      </a>
    </div>,
  );
};
