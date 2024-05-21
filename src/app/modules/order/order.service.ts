import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (order: TOrder) => {
  const result = await OrderModel.create(order);
  return result;
};

const getOrderListFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getOrderListFromDB,
};
