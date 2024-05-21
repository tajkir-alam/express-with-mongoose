import { Request, Response } from "express";
import { orderServices } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: OrderData } = req.body;
    const result = await orderServices.createOrderIntoDB(OrderData);
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

export const orderController = {
  createOrder,
};
