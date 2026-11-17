import swaggerJSDOC from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";
import mongooseToSwagger from "mongoose-to-swagger";
import { Express } from "express";
import Role from "./models/role.model";
import User from "./models/user.model";
import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDOC.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Users Backend API",
      version: "1.0.0",
      description: "API for users, roles, authentication",
    },
    servers: [
      {
        url: "http://localhost:3003/api",
        description: "Local Server",
      },
      {
        url: "https://xxxxx.xxx.com",
        description: "Render Server",
      },
    ],
    components: {
      schemas: {
        User: mongooseToSwagger(User),
        Role: mongooseToSwagger(Role),
      },
    },
  },
  apis: ["./src/routes*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));
};
