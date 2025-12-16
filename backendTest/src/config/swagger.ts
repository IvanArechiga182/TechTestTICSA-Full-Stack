import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend Test",
      version: "1.0.0",
      description: "Task CRUD for backend test",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        LoginUser: {
          type: "object",
          properties: {
            username: { type: "string" },
            password: { type: "string" },
          },
        },
        LoginUserResponse: {
          type: "object",
          properties: {
            status: { type: "number" },
            message: { type: "string" },
            token: {
              type: "string",
              description: "JWT provided for the logged in user ",
            },
          },
        },
        Task: {
          type: "object",
          required: ["title", "description", "status"],
          properties: {
            id: { type: "number" },
            title: { type: "string" },
            description: { type: "string" },
            status: {
              type: "string",
              enum: ["pending", "in_progress", "done"],
              description: "Current task status",
              example: "pending",
            },
          },
        },
        TaskResponse: {
          type: "object",
          properties: {
            status: {
              type: "number",
              description: "Response status",
              example: 200,
            },
            message: {
              type: "string",
              description: "Operation message with information",
              example: "Data retrieved successfully.",
            },
            singleTask: {
              $ref: "#/components/schemas/Task",
              nullable: true,
              description: "Single task data retrieved.",
            },
            tasksList: {
              type: "array",
              nullable: true,
              items: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app: Express) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log("Documentación disponible en http://localhost:3000/api/docs");
};
