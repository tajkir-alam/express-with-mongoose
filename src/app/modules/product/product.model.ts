import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariants } from "./product.interface";

const variantsSchema = new Schema<TVariants>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    min: [0, 'quantity have to be 0'],
    required: [true, 'the minimum quantity have to be 0'],
  },
  inStock: {
    type: Boolean,
  },
});

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, "please enter a valid name"],
  },
  description: {
    type: String,
    minlength: 50,
    required: [true, "description should have at least 50 characters"],
  },
  price: {
    type: Number,
    min: 1,
    required: [true, "minimum price have to be 1"],
  },
  category: {
    type: String,
    required: [true, "please select category"],
  },
  tags: {
    type: [String],
    required: [true, "enter product tags"],
  },
  variants: {
    type: [variantsSchema],
    required: [true, "please provide variants of the product"],
  },
  inventory: {
    type: inventorySchema,
    required: [true, "please provide stock inventory"],
  },
});

export const ProductModel = model<TProduct>("product", productSchema);
