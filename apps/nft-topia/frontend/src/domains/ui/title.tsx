import { mp } from "@pfl-wsr/ui";
import React from "react";

export const Title: React.FC<React.ComponentProps<"h2">> = (props) => {
  return mp(
    props,
    <h2 {...props} className="py-12 text-4xl font-bold">
      {props.children}
    </h2>,
  );
};
