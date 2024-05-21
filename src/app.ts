import cors from "cors";
import express, { Application, Request, Response } from "express";
const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
//   var a = 10;
  res.send("hello world!!!");
});

export default app;
