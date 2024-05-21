import { Request, Response } from "express";
import { productServices } from "./product.service";
import productValidationSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    // ZOD Validation and parsing
    const parsedProductData = productValidationSchema.parse(productData);

    const result = await productServices.createProductIntoDB(parsedProductData);
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      data: error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      data: error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const result = await productServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `there is no data which contains ${productId}`,
    });
  }
};

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
};