import { RowDataPacket } from "mysql2";
import { TaskStatus } from "../Types/TaskStatus";

export interface NewTaskRequest extends RowDataPacket {
  title: string;
  description: string;
  status: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
