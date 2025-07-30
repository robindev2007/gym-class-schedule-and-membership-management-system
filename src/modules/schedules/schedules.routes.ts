import { authMiddleware } from "../../middleware/auth";
import { GetSchedules } from "./schedules.controller";
import { Router } from "express";

const router = Router();

router.get("/", authMiddleware, GetSchedules);

export default router;
