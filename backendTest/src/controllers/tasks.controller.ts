import { Request, Response } from "express";
import { pool } from "../config/database";
import { Task } from "../models/Task";
import { TaskResponse } from "../interfaces/TaskResponse";
import { NewTaskRequest } from "../interfaces/NewTaskRequest";
import { TaskStatus } from "../Types/TaskStatus";

export const getTasks = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const [rows] = await pool.query<Task[]>(
      "SELECT * FROM tasks LIMIT ? OFFSET ?",
      [limit, offset]
    );

    if (!rows.length) {
      const response: TaskResponse = {
        status: 404,
        message: "No tasks are available",
        singleTask: null,
        tasksList: [],
      };
      return res.status(response.status).send(response);
    }

    const response: TaskResponse = {
      status: 200,
      message: "Data retrieved successfully.",
      singleTask: null,
      tasksList: rows,
    };
    return res.status(response.status).send(response);
  } catch (error) {
    const response: TaskResponse = {
      status: 500,
      message: "Internal server error",
      singleTask: null,
      tasksList: [],
    };
    return res.status(response.status).send(response);
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const taskId = Number(req.params.id);

  if (isNaN(taskId)) {
    const response: TaskResponse = {
      status: 404,
      message: "Task id must be a number",
      singleTask: null,
      tasksList: [],
    };
    return res.status(response.status).json(response);
  }

  try {
    const [rows] = await pool.query<Task[]>(
      "SELECT * FROM tasks WHERE taskId = ?",
      [taskId]
    );

    if (!rows.length) {
      const response: TaskResponse = {
        status: 404,
        message: "Task not found",
        singleTask: null,
        tasksList: [],
      };
      return res.status(response.status).json(response);
    }
    const response: TaskResponse = {
      status: 200,
      message: "Task was found.",
      singleTask: rows[0],
      tasksList: [],
    };

    return res.status(response.status).json(response);
  } catch {
    const response: TaskResponse = {
      status: 500,
      message: "Internal server error",
      singleTask: null,
      tasksList: [],
    };
    return res.status(response.status).send(response);
  }
};

export const postNewTask = async (req: Request, res: Response) => {
  const { title, description, status }: NewTaskRequest = req.body;
  const validStatuses: TaskStatus[] = ["pending", "in_progress", "done"];

  if (!validStatuses.includes(status)) {
    const response: TaskResponse = {
      status: 400,
      message: `Status ${status} is not a valid status`,
      singleTask: null,
      tasksList: [],
    };
    return res.status(response.status).send(response);
  }

  if (!title || !description || !status) {
    const response: TaskResponse = {
      status: 400,
      message: "One or more parts of the request are missing.",
      singleTask: null,
      tasksList: [],
    };
    return res.status(response.status).send(response);
  }

  try {
    const [result] = await pool.query<any>(
      "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
      [title, description, status]
    );

    const insertedId = result.insertId;

    const [rows] = await pool.query<Task[]>(
      "SELECT * FROM tasks WHERE taskId = ?",
      [insertedId]
    );

    const insertedTask = rows[0];

    const response: TaskResponse = {
      status: 201,
      message: "Task created successfully.",
      singleTask: insertedTask,
      tasksList: [],
    };

    return res.status(response.status).send(response);
  } catch {
    const response: TaskResponse = {
      status: 500,
      message: "Internal server error",
      singleTask: null,
      tasksList: [],
    };
    return res.status(response.status).send(response);
  }
};

export const updateTaskById = async (req: Request, res: Response) => {
  const taskId = Number(req.params.id);
  const { title, description, status }: NewTaskRequest = req.body;
  const validStatuses: TaskStatus[] = ["pending", "in_progress", "done"];

  if (isNaN(taskId)) {
    const response: TaskResponse = {
      status: 404,
      message: "Task id must be a number",
      singleTask: null,
      tasksList: [],
    };
    return res.status(response.status).json(response);
  }

  if (!validStatuses.includes(status)) {
    const response: TaskResponse = {
      status: 400,
      message: `Status ${status} is not a valid status`,
      singleTask: null,
      tasksList: [],
    };
    return res.status(response.status).send(response);
  }

  try {
    const updatedAt = new Date().toISOString();

    const [result] = await pool.query<any>(
      "UPDATE tasks SET title = ?, description = ?, status = ?, updatedAt = ? WHERE taskId = ?",
      [title, description, status, updatedAt, taskId]
    );

    if (result.affectedRows === 0) {
      const response: TaskResponse = {
        status: 404,
        message: "Task not found",
        singleTask: null,
        tasksList: [],
      };
      return res.status(response.status).send(response);
    }

    const [rows] = await pool.query<Task[]>(
      "SELECT * FROM tasks WHERE taskId = ?",
      [taskId]
    );

    const updatedTask = rows[0];

    const response: TaskResponse = {
      status: 200,
      message: "Task updated successfully",
      singleTask: updatedTask,
      tasksList: [],
    };

    return res.status(response.status).send(response);
  } catch {
    const response: TaskResponse = {
      status: 500,
      message: "Internal server error.",
      singleTask: null,
      tasksList: [],
    };

    return res.status(response.status).send(response);
  }
};

export const deleteTaskById = async (req: Request, res: Response) => {
  const taskId = Number(req.params.id);

  if (isNaN(taskId)) {
    const response: TaskResponse = {
      status: 404,
      message: "Task id must be a number",
      singleTask: null,
      tasksList: [],
    };
    return res.status(response.status).json(response);
  }

  try {
    const [result] = await pool.query<any>(
      "DELETE FROM tasks WHERE taskId = ?",
      [taskId]
    );

    if (result.affectedRows === 0) {
      const response: TaskResponse = {
        status: 404,
        message: "Task not found",
        singleTask: null,
        tasksList: [],
      };

      return res.status(response.status).send(response);
    }

    const response: TaskResponse = {
      status: 200,
      message: "Task deleted successfully",
      singleTask: null,
      tasksList: [],
    };
    return res.status(response.status).send(response);
  } catch {
    const response: TaskResponse = {
      status: 500,
      message: "Internal server error",
      singleTask: null,
      tasksList: [],
    };
    return res.status(response.status).send(response);
  }
};
