import { Request, Response } from "express";
import { orderServices } from "./order.service";
import orderValidationSchema from "./order.validation";
import { productServices } from "../product/product.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: OrderData } = req.body;

    // const orderingProduct = await productServices.updateProductIntoDB(
    //   OrderData.productId,
    //   OrderData.quantity
    // );

    // console.log(OrderData);

    const parsedOrderData = orderValidationSchema.parse(OrderData);
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
