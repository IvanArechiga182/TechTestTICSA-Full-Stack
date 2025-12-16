import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { swaggerDocs } from "./config/swagger";
import tasksRoutes from "./routes/tasks.routes";
import usersRoutes from "./routes/auth.routes";
import "./config/database";
import "./server";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", tasksRoutes);
app.use("/auth/", usersRoutes);
swaggerDocs(app);

export default app;
