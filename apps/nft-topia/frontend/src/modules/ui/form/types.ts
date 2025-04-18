import { type IComponentBaseProps } from "@pfl-wsr/ui";
import {
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { type z } from "zod";

type _IFormItem<
  TValues extends FieldValues,
  TName extends Path<TValues> = Path<TValues>,
> =
  TName extends Path<TValues>
    ? {
        name: TName;
        label?: string;
        renderControl?: (
          field: ControllerRenderProps<TValues, TName>,
        ) => React.ReactElement;
        description?: string;
        disabled?: boolean;
      }
    : never;

type IFormPropsOnSubmit<TValues extends FieldValues> = (
  values: TValues,
) => void | Promise<void>;

export type IFormBuilderItem<TValues extends FieldValues> = _IFormItem<TValues>;

export type IFormBuilderItems<TValues extends FieldValues> =
  IFormBuilderItem<TValues>[];

export interface IFormBuilderProps<TSchema extends z.ZodObject<any>>
  extends IComponentBaseProps {
  items: IFormBuilderItem<z.infer<TSchema>>[];
  onSubmit?: IFormPropsOnSubmit<z.infer<TSchema>>;
  /** @default "left" */
  submitAlign?: "left" | "right";
  extra?: React.ReactNode;
  defaultValues?: {
    [K in keyof z.infer<TSchema>]: z.infer<TSchema>[K] | null;
  };
  submitButtonProps?: React.ComponentProps<"button">;
  schema: TSchema;
  styles?: {
    label?: IComponentBaseProps;
    control?: IComponentBaseProps;
    description?: IComponentBaseProps;
  };
}
