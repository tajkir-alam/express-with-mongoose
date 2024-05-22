import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  return result;
};

const updateProductIntoDB = async (id: string, product: TProduct) => {
  const result = await ProductModel.updateOne(
    { _id: id },
    { $set: product },
    { runValidators: true }
  );
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id });
  return result;
};

const searchProductsFromDB = async (searchTerm: string) => {
  const searchRegex = new RegExp(searchTerm, "i");
  const result = await ProductModel.find({
    $or: [
      { name: { $regex: searchRegex } },
      { category: { $regex: searchRegex } },
      { description: { $regex: searchRegex } },
    ],
  });
  return result;
};

const updateProductInventory = async (id: string, quantity: number) => {
  const updateProduct = await ProductModel.findByIdAndUpdate(
    id,
    {
      "inventory.quantity": quantity,
      "inventory.inStock": quantity > 0,
    },
    { new: true }
  );
  return updateProduct;
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  searchProductsFromDB,
  updateProductInventory,
};
