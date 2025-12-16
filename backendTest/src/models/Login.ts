import { RowDataPacket } from "mysql2";

export interface Login extends RowDataPacket {
  id: number;
  user: string;
  password: string;
}
