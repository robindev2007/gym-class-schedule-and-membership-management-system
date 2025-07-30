import { authMiddleware, isAdmin, isTrainer } from "../../middleware/auth";
import { getAssignedSchedules } from "./trainer.controller";
import { Router } from "express";

const router = Router();

router.get("/schedules", authMiddleware, isTrainer, getAssignedSchedules);

export default router;
