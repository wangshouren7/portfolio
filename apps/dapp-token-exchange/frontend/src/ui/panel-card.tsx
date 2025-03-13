import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  type IComponentBaseProps,
  mp,
} from "@pfl-wsr/ui";
import React from "react";

interface IPanelCardProps extends IComponentBaseProps {
  children: React.ReactNode;
  title: React.ReactNode;
  extra?: React.ReactNode;
}

export const PanelCard: React.FC<IPanelCardProps> = (props) => {
  return mp(
    props,
    <Card className="flex h-full flex-col overflow-auto">
      <CardHeader>
        <CardTitle>
          <div className="gap-2 flex items-center">
            {props.title} {props.extra}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="gap-4 flex flex-1 flex-col overflow-auto">
        {props.children}
      </CardContent>
    </Card>,
  );
};
