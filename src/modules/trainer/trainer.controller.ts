import { Request, Response, NextFunction } from "express";
import { trainerScheduleService } from "./trainer.services";
import { successResponse } from "../../utils/response";

export const getAssignedSchedules = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trainerId = req.user.id;
    const schedules = await trainerScheduleService.getTrainerSchedulesById(
      trainerId
    );
    return successResponse(
      res,
      200,
      "Assigned schedules retrieved successfully",
      { schedules }
    );
  } catch (error) {
    next(error);
  }
};
