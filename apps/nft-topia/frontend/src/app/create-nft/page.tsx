"use client";
import { useCreateToken } from "@/domains/contracts/hooks";
import { FileUpload } from "@/domains/create/file-upload";
import { uploadTokenJsonToIpfs } from "@/domains/ipfs/actions";
import { FormBuilder } from "@/modules/ui/form/form-builder";
import { type IFormBuilderItems } from "@/modules/ui/form/types";
import { Input, useMemoizedFn } from "@pfl-wsr/ui";
import { parseEther } from "viem";
import {
  CREATE_FORM_SCHEMA,
  type ICreateFormValues,
} from "@/domains/create/form-values";
import { useTranslations } from "next-intl";

const items = [
  {
    name: "file",
    label: "Upload File",
    renderControl: (field) => <FileUpload {...field} />,
  },
  {
    name: "name",
    label: "Name",
  },
  {
    name: "description",
    label: "Description",
  },
  {
    name: "price",
    label: "Price",
    renderControl: (field) => <Input type="number" {...field} />,
  },
] satisfies IFormBuilderItems<ICreateFormValues>;

export default function Create() {
  const createToken = useCreateToken();
  const t = useTranslations("Basic");
  const onSubmit = useMemoizedFn(async (values: ICreateFormValues) => {
    const url = await uploadTokenJsonToIpfs(values);
    await createToken(url, parseEther(values.price.toString()));
  });

  return (
    <div>
      <div className="prose">
        <h2>{t("Create NFT")}</h2>
      </div>

      <FormBuilder
        items={items}
        schema={CREATE_FORM_SCHEMA}
        styles={{
          label: {
            className: "text-2xl font-bold",
          },
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
}
