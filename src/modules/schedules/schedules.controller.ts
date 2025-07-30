import { Request, Response, NextFunction } from "express";
import { PublicScheduleService } from "./schedules.services";
import { successResponse } from "../../utils/response";

export const GetSchedules = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schedules = await PublicScheduleService.getAvailableSchedules();
    return successResponse(res, 200, "Available schedules retrieved", {
      schedules,
    });
  } catch (error) {
    next(error);
  }
};
