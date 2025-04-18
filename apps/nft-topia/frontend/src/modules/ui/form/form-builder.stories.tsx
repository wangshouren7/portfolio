import { type Meta } from "@storybook/react";
import { FormBuilder } from "./form-builder";
import { z } from "zod";
import { type IFormBuilderItems } from "./types";
import { Input } from "@pfl-wsr/ui";
import { slg } from "../storybook";

const meta = {
  title: "modules/ui/form/form-builder",
  component: FormBuilder,
} satisfies Meta;

const schema = z.object({
  name: z.string(),
  age: z.coerce.number(),
});

type IValues = z.infer<typeof schema>;

const items = [
  {
    name: "name",
    label: "Your name",
  },

  {
    name: "age",
    label: "Your age",
    renderControl: (field) => <Input type="number" {...field} />,
  },
] satisfies IFormBuilderItems<IValues>;

export const Default = () => (
  <FormBuilder items={items} schema={schema} onSubmit={slg.log} />
);

export default meta;
