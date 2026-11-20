import { TestServer } from "./testSetup";
import userRoutes from "../routes/user.routes";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

const server = new TestServer();
server.app.use("/users", userRoutes);

describe("User API Tests for GET", () => {
  let token: string;

  beforeAll(async () => {
    await server.start();
    // const hash = await bcrypt.hash("admin123", 10);
    // const user = await User.create({
    //   username: "admin10",
    //   password: hash,
    //   email: "admin@aueb.gr",
    //   roles: [],
    // });
    // token = jwt.sign(
    //   {
    //     username: "admin",
    //     email: "admin@aueb.gr",
    //     roles: [
    //       {
    //         role: "ADMIN",
    //         description: "Administrator user",
    //         active: true,
    //       },
    //     ],
    //   },
    //   JWT_SECRET,
    //   { expiresIn: "1h" },
    // );
  });

  afterAll(async () => {
    await server.stop();
  });

  test("GET /users -> returns a list of users", async () => {
    const res = await server.request.get("/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 10000);
});
