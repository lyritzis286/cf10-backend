import express from "express";
import userRoutes from "./routes/user.routes";
import roleRoutes from "./routes/role.routes";

const app = express();
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/role", roleRoutes);

export default app;
