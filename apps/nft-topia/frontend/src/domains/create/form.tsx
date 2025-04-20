"use client";
import { useCreateToken } from "@/domains/contracts/hooks";
import { FileUpload } from "@/domains/create/file-upload";
import { uploadTokenJsonToIpfs } from "@/domains/ipfs/actions";
import { FormBuilder } from "@/modules/ui/form/form-builder";
import { type IFormBuilderItems } from "@/modules/ui/form/types";
import { mp, useMemoizedFn } from "@pfl-wsr/ui";
import { parseEther } from "viem";
import {
  CREATE_FORM_SCHEMA,
  type ICreateFormValues,
} from "@/domains/create/form-values";
import { InputEther } from "@/modules/ui/input-ether";

const items = [
  {
    name: "file",
    label: "Upload File",
    renderControl: (field) => <FileUpload {...field} />,
  },
  {
    name: "name",
    label: "Name",
    renderControl: (field) =>
      mp(
        field,
        <input
          {...field}
          className="input w-full"
          placeholder="Please enter NFT name"
        />,
      ),
  },
  {
    name: "description",
    label: "Description",
    renderControl: (field) =>
      mp(
        field,
        <textarea
          {...field}
          className="textarea w-full"
          placeholder="Please enter NFT description"
        />,
      ),
  },
  {
    name: "price",
    label: "Price",
    renderControl: (field) =>
      mp(
        field,
        <InputEther
          {...field}
          className="w-full"
          placeholder="Please enter NFT price"
        />,
      ),
  },
] satisfies IFormBuilderItems<ICreateFormValues>;

export function CreateForm() {
  const createToken = useCreateToken();
  const onSubmit = useMemoizedFn(async (values: ICreateFormValues) => {
    const url = await uploadTokenJsonToIpfs(values);
    await createToken(url, parseEther(values.price.toString()));
  });

  return (
    <FormBuilder
      items={items}
      schema={CREATE_FORM_SCHEMA}
      styles={{
        label: {
          className: "text-xl font-bold",
        },
      }}
      onSubmit={onSubmit}
    />
  );
}
