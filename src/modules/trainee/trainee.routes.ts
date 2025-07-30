import {
  authMiddleware,
  isAdmin,
  isTrainee,
  isTrainer,
} from "../../middleware/auth";
import {
  bookTraineeSchedule,
  cancelBooking,
  getMyBookings,
} from "./trainee.controller";
import { Router } from "express";

const router = Router();

router.post("/bookings", authMiddleware, isTrainee, bookTraineeSchedule);
router.delete("/bookings/:id", authMiddleware, isTrainee, cancelBooking);
router.get("/bookings", authMiddleware, isTrainee, getMyBookings);

export default router;
