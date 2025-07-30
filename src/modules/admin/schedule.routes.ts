import { Router } from "express";
import { AdminScheduleController } from "./schedule.controller";
import { authMiddleware, isAdmin } from "../../middleware/auth";

const router = Router();

router.post(
  "/",
  authMiddleware,
  isAdmin,
  AdminScheduleController.createSchedule
);
router.get("/", authMiddleware, isAdmin, AdminScheduleController.getSchedules);
router.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  AdminScheduleController.deleteSchedule
);

export default router;
