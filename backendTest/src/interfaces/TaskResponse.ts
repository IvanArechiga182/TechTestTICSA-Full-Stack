import { Task } from "../models/Task";

export interface TaskResponse {
  status: number;
  message: string;
  singleTask: Task | null;
  tasksList: Task[];
}
