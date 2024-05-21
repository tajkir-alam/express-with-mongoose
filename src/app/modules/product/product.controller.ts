import { Request, Response } from "express";
import { productServices } from "./product.service";
import productValidationSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    // ZOD Validation and parsing
    const parsedProductData = productValidationSchema.parse(req.body);

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
  // Fetch according by query
  const { searchTerm } = req.query;

  if (searchTerm) {
    try {
      const searchesProducts = await productServices.searchProductsFromDB(
        searchTerm as string
      );
      if (searchesProducts.length > 0) {
        return res.status(200).json({
          success: true,
          message: `Products matching search term '${searchTerm}' fetched successfully!`,
          data: searchesProducts,
        });
      } else {
        return res.status(204).json({
          success: false,
          message: `Products matching with '${searchTerm}' have no product!`,
          data: searchesProducts,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Please check the search value again",
        data: error,
      });
    }
  }

  // Fetch all data
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

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    const { productId } = req.params;

    // ZOD Validation and parsing
    const parsedProductData = productValidationSchema.parse(productData);

    const result = await productServices.updateProductIntoDB(
      productId,
      parsedProductData
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product failed to update",
      data: error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const result = await productServices.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `there is no data which contains ${productId} to delete`,
    });
  }
};

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
