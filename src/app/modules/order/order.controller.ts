import { Request, Response } from "express";
import { orderServices } from "./order.service";
import orderValidationSchema from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: OrderData } = req.body;
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
  const result = await orderServices.getOrderListFromDB();
  try {
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
