import { z } from "zod";

export const CREATE_FORM_SCHEMA = z.object({
  file: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.coerce.number().gt(0),
});

export type ICreateFormValues = z.infer<typeof CREATE_FORM_SCHEMA>;
