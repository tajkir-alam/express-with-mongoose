import { z } from "zod";

const variantsValidationSchema = z.object({
  type: z.string({
    invalid_type_error: "provide a valid value",
  }),
  value: z.string({
    invalid_type_error: "provide a valid value",
  }),
});

const inventoryValidationSchema = z.object({
  quantity: z
    .number({
      invalid_type_error: "provide a valid value",
    })
    .min(0, { message: "Quantity has to be at least 0" })
    .nonnegative({ message: "Quantity must be a non-negative number" }),
  inStock: z.boolean({
    invalid_type_error: "provide a valid value",
  }),
});

const productValidationSchema = z.object({
  name: z.string({
    invalid_type_error: "provide a valid name",
  }),
  description: z
    .string()
    .min(50, { message: "Description should have at least 50 characters" }),
  price: z
    .number({
      invalid_type_error: "provide a valid price",
    })
    .min(1, { message: "Minimum price has to be 1" }),
  category: z.string(),
  tags: z.array(z.string()).min(1, { message: "Enter product tags" }),
  variants: z
    .array(variantsValidationSchema)
    .min(1, { message: "Please provide variants of the product" }),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
