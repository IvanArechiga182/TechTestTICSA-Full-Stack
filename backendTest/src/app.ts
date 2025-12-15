import express, { Request, Response } from "express";
import dotenv from "dotenv";
import "./config/database";
import "./server";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/", routes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Test completed!");
});

export default app;
