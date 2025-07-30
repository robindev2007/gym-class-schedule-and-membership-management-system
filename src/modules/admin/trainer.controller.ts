import { NextFunction, Request, Response } from "express";
import { adminTrainerService } from "./trainer.service";
import { CreateTrainerSchema } from "../../zod/zod";
import { errorResponse, successResponse } from "../../utils/response";
import { prisma } from "../../config/db";
import { ZodError } from "zod";

export const createTrainer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate data
    const { email, name, password } = CreateTrainerSchema.parse(req.body);

    const trainer = await adminTrainerService.createTrainer(
      name,
      email,
      password
    );
    return successResponse(res, 201, "Trainer created successful", { trainer });
  } catch (error) {
    next(error);
  }
};

export const getAllTrainer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trainerList = await adminTrainerService.getAllTrainer();
    return successResponse(res, 200, "trainer schedule fetch successful", {
      trainerList,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTrainer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate data
    const id = Number(req.params.id);
    const trainer = await prisma.user.findUnique({
      where: { id, role: "TRAINER" },
    });

    if (!trainer) {
      return errorResponse(res, 404, "Trainer not found or not a trainer.");
    }

    await adminTrainerService.deleteTrainer(id);
    successResponse(res, 200, "Trainer deleted successfully");
  } catch (error) {
    next(error);
  }
};
