"use client";

import {
  useRequest,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormUI,
  Input,
  cn,
  mp,
} from "@pfl-wsr/ui";
import { capitalCase } from "change-case";
import { isNil, omitBy } from "lodash-es";
import { type ControllerRenderProps } from "react-hook-form";
import { type z } from "zod";
import { useForm } from "./use-form";
import React from "react";
import { type IFormBuilderProps } from "./types";
import { AsyncButton } from "../async-button";

function removeNilKeys<T extends object>(
  object: T,
): {
  [Key in keyof T as T[Key] extends null | undefined ? never : Key]: T[Key];
} {
  return omitBy(object, isNil) as any;
}

const defaultRenderControl = (field: ControllerRenderProps<any, string>) => (
  <Input {...field} />
);

export const FormBuilder = <TSchema extends z.ZodObject<any>>(
  props: IFormBuilderProps<TSchema>,
) => {
  const {
    items,
    onSubmit,
    submitAlign = "left",
    extra,
    defaultValues,
    schema,
    styles,
    submitButtonProps,
  } = props;
  const { run, loading } = useRequest(async (values) => onSubmit?.(values), {
    manual: true,
  });

  const form = useForm<z.infer<TSchema>>({
    schema,
    defaultValues: removeNilKeys(defaultValues ?? {}),
  });

  return (
    <FormUI {...form}>
      {mp(
        props,
        <form
          className="flex w-full flex-col gap-6"
          onSubmit={form.handleSubmit(run)}
        >
          {items.map(
            ({
              name,
              description,
              label,
              renderControl = defaultRenderControl,
              disabled,
            }) => (
              <FormField
                key={name}
                control={form.control}
                disabled={disabled === true}
                name={name}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-4">
                    {mp(
                      styles?.label,
                      <FormLabel className="paragraph-semibold text-dark400_light800">
                        {label && capitalCase(label)}
                        {!schema.shape[name]?.isOptional() && (
                          <span className="text-primary-500">*</span>
                        )}
                      </FormLabel>,
                    )}

                    {mp(
                      styles?.control,
                      <FormControl>{renderControl(field as any)}</FormControl>,
                    )}

                    {mp(
                      styles?.description,
                      <FormDescription className="body-regular text-light-500 mt-2.5">
                        {description || schema.shape[name]?.description}
                      </FormDescription>,
                    )}
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            ),
          )}

          <div className="flex flex-wrap gap-4">
            <AsyncButton
              // eslint-disable-next-line react/no-children-prop
              children={"Submit"}
              className={cn(
                submitAlign === "right" && "ml-auto",
                "btn capitalize btn-primary",
              )}
              loading={loading}
              {...submitButtonProps}
            />
            {extra}
          </div>
        </form>,
      )}
    </FormUI>
  );
};
