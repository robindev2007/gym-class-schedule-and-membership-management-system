import { Router } from "express";
import {
  createTrainer,
  deleteTrainer,
  getAllTrainer,
} from "./trainer.controller";
import { authMiddleware, isAdmin } from "../../middleware/auth";

const router = Router();

router.post("/", authMiddleware, isAdmin, createTrainer);
router.get("/", authMiddleware, isAdmin, getAllTrainer);
router.delete("/:id", authMiddleware, isAdmin, deleteTrainer);

export default router;
