import { z } from "zod";

const orderValidationSchema = z.object({
  email: z.string().email("Invalid Email Address!"),
  productId: z.string(),
  price: z.number().min(1, { message: "Minimum price have to be 1" }),
  quantity: z
    .number()
    .int()
    .min(0, { message: "quantity have to be a positive number" }),
});

export default orderValidationSchema;
