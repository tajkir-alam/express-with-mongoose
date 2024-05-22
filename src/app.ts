import cors from "cors";
import express, { Application, Request, Response } from "express";
import { ProductRoutes } from "./app/modules/product/product.route";
import { OrderRoutes } from "./app/modules/order/order.route";
const app: Application = express();

app.use(express.json());
app.use(cors());

// All routes are here
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

// Home route
app.get("/", (req: Request, res: Response) => {
  // res.status(200).json({
  //   "Get All Product": "www.fdfd.com"
  // });
  res.status(200).send(
    `
    <h1 style="text-align: center;">API Documentation</h1>
    <ul style="list-style: decimal; text-align: center;">
      <li>
        <a target="_blank" href="https://e-commerce-mongoose-ts.vercel.app/api/products">Get All Products</a>
      </li>
      <br />
      <li>
        <a target="_blank" href="https://e-commerce-mongoose-ts.vercel.app/api/products/:productID">Get Product By ID</a>
      </li>
      <br />
      <li>
        <a target="_blank" href="https://e-commerce-mongoose-ts.vercel.app/api/products?searchTerm=iphone">Search Product</a>
      </li>
      <br />
      <li>
        <a target="_blank" href="https://e-commerce-mongoose-ts.vercel.app/api/orders">Get All Orders</a>
      </li>
      <br/>
      <li>
        <a target="_blank" href="https://e-commerce-mongoose-ts.vercel.app/api/orders?email=level2@programming-hero.com">Get All Orders By Email</a>
      </li>
      <br/>
    </ul>
    `
  );
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
