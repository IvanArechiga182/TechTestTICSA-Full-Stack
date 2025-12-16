import { RowDataPacket } from "mysql2";
import type { TaskStatus } from "../Types/TaskStatus";
export interface Task extends RowDataPacket {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}
