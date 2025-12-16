import { Router } from "express";
import {
  deleteTaskById,
  getTaskById,
  getTasks,
  postNewTask,
  updateTaskById,
} from "../controllers/tasks.controller";
import { authMiddleware } from "../middlewares/JwtMiddleware";
const tasksRoutes = Router();
/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: Get all registered tasks
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 40
 *           default: 10
 *         description: Total records per page
 *     responses:
 *       200:
 *         description: List of registered tasks by page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 200
 *               messsage: Data retrieved successfully.
 *               singleTask: null
 *               tasksList:
 *                   - id: 1
 *                     title: Test Task
 *                     description: This is a test task
 *                     status: in_progress
 *       400:
 *         description: Request was incorrect
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 400
 *               message: Invalid request
 *               singleTask: null
 *               tasksList: []
 *       401:
 *         description: User was not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 401
 *               message: User was not authenticated
 *               singleTask: null
 *               tasksList: []
 *       404:
 *         description: No tasks are available
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 404
 *               message: No tasks are available
 *               singleTask: null
 *               tasksList: []
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 500
 *               message: Internal server error.
 *               singleTask: null
 *               tasksList: []
 */
tasksRoutes.get("/tasks", authMiddleware, getTasks);
/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     summary: Get a single task by its id
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Id of the task to search
 *     responses:
 *       200:
 *         description: Task found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 200
 *               messsage: Data retrieved successfully.
 *               singleTask:
 *                 id: 1
 *                 title: "Test task"
 *                 description: "This is a test task"
 *                 status: pending
 *                 createdAt: 2025-12-16T03:44:17.000Z
 *                 updatedAt: null
 *               tasksList: []
 *       400:
 *         description: Request was incorrect
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 400
 *               message: Invalid request
 *               singleTask: null
 *               tasksList: []
 *       401:
 *         description: User was not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 401
 *               message: User was not authenticated
 *               singleTask: null
 *               tasksList: []
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 404
 *               message: Task not found
 *               singleTask: null
 *               tasksList: []
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 500
 *               message: Internal server error.
 *               singleTask: null
 *               tasksList: null
 */
tasksRoutes.get("/tasks/:id", authMiddleware, getTaskById);
/**
 * @openapi
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *           example:
 *             title: "New task"
 *             description: "Im creating a new task"
 *             status: pending
 *     responses:
 *       200:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 200
 *               messsage: Task created successfully
 *               singleTask:
 *                 id: 1
 *                 title: "New Task"
 *                 description: "Im creating a new task"
 *                 status: pending
 *                 createdAt: 2025-12-16T03:44:17.000Z
 *                 updatedAt: null
 *               tasksList: []
 *       400:
 *         description: Request was incorrect
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 400
 *               message: Invalid request
 *               singleTask: null
 *               tasksList: []
 *       401:
 *         description: User was not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 401
 *               message: User was not authenticated
 *               singleTask: null
 *               tasksList: []
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 500
 *               message: Internal server error.
 *               singleTask: null
 *               tasksList: null
 */
tasksRoutes.post("/tasks", authMiddleware, postNewTask);
/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Id of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *           example:
 *             title: "Updated Task"
 *             description: "Im updating an existing task"
 *             status: in_progress
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 200
 *               messsage: Task created successfully
 *               singleTask:
 *                 id: 1
 *                 title: "Updated Task"
 *                 description: "Im updating a new task"
 *                 status: pending
 *                 createdAt: 2025-12-16T03:44:17.000Z
 *                 updatedAt: 2025-12-16T03:54:17.000Z
 *               tasksList: []
 *       400:
 *         description: Request was incorrect
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 400
 *               message: Invalid request
 *               singleTask: null
 *               tasksList: []
 *       401:
 *         description: User was not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 401
 *               message: User was not authenticated
 *               singleTask: null
 *               tasksList: []
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 401
 *               message: Task not found
 *               singleTask: null
 *               tasksList: []
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 500
 *               message: Internal server error.
 *               singleTask: null
 *               tasksList: null
 */
tasksRoutes.put("/tasks/:id", authMiddleware, updateTaskById);
/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     summary: Delete an existing task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Id of the task to update
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 200
 *               messsage: Task deleted successfully
 *               singleTask: null
 *               tasksList: []
 *       400:
 *         description: Request was incorrect
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 400
 *               message: Invalid request
 *               singleTask: null
 *               tasksList: []
 *       401:
 *         description: User was not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 401
 *               message: User was not authenticated
 *               singleTask: null
 *               tasksList: []
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 401
 *               message: Task not found
 *               singleTask: null
 *               tasksList: []
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *             example:
 *               status: 500
 *               message: Internal server error.
 *               singleTask: null
 *               tasksList: null
 */
tasksRoutes.delete("/tasks/:id", authMiddleware, deleteTaskById);
export default tasksRoutes;
