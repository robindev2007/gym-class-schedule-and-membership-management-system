import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "../src/modules/auth/auth.routes";
import adminSchedulesRouter from "../src/modules/admin/schedule.routes";
import adminTrainersRouter from "../src/modules/admin/trainer.routes";
import trainerRouter from "./modules/trainer/trainer.routes";
import traineeRouter from "./modules/trainee/trainee.routes";
import scheduleRouter from "./modules/schedules/schedules.routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/admin/trainers", adminTrainersRouter);
app.use("/api/admin/schedules", adminSchedulesRouter);
app.use("/api/trainer", trainerRouter);
app.use("/api/trainee", traineeRouter);
app.use("/api/schedule", scheduleRouter);

// error handler
app.use(errorHandler);

export default app;
