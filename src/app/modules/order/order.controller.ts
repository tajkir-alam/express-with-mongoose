import { Request, Response } from "express";
import { orderServices } from "./order.service";
import orderValidationSchema from "./order.validation";
import { productServices } from "../product/product.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: OrderData } = req.body;
    const parsedOrderData = orderValidationSchema.parse(OrderData);

    // fetching the product which is going to order
    const orderingProduct = await productServices.getSingleProductFromDB(
      OrderData.productId
    );
    if (!orderingProduct) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Checking if the order quantity is in stock or not!
    if (orderingProduct.inventory.quantity < parsedOrderData.quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }

    // this function is decreasing the product quantity as per the order quantity
    const updatedProduct = await productServices.updateProductInventory(
      parsedOrderData.productId,
      orderingProduct.inventory.quantity - parsedOrderData.quantity
    );
    if (!updatedProduct) {
      return res.status(500).json({
        success: false,
        message: "Failed to update product inventory",
      });
    }
    const result = await orderServices.createOrderIntoDB(parsedOrderData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong!",
      data: error,
    });
  }
};

const getOrderList = async (req: Request, res: Response) => {
  const { email } = req.query;

  // filtering with email if user give any email query parameter
  if (email) {
    try {
      const filterByEmail = await orderServices.filterOrderListFromDB(
        email as string
      );
      if (filterByEmail.length > 0) {
        return res.status(200).json({
          success: true,
          message: `Orders fetched successfully for user ${email!}`,
          data: filterByEmail,
        });
      } else {
        return res.status(204).json({
          success: false,
          message: `${email!} did not ordered any product yet!`,
          data: filterByEmail,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Unable to find your order",
        data: error,
      });
    }
  }

  // Fetch all orders
  try {
    const result = await orderServices.getOrderListFromDB();
    res.status(200).json({
      success: true,
      message: "Orders Fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong!",
      data: error,
    });
  }
};

export const orderController = {
  createOrder,
  getOrderList,
};
