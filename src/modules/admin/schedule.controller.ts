import { NextFunction, Request, Response } from "express";
import {
  AssignTrainerToScheduleSchema,
  CreateScheduleSchema,
  DeleteScheduleSchema,
} from "../../zod/zod";
import { adminScheduleService } from "./schedule.service";
import { successResponse } from "../../utils/response";

export const AdminScheduleController = {
  async createSchedule(req: Request, res: Response, next: NextFunction) {
    try {
      const { date, startTime, trainerId } = CreateScheduleSchema.parse(
        req.body
      );

      const schedule = await adminScheduleService.createSchedule(
        trainerId,
        date,
        startTime
      );

      return successResponse(res, 201, "Schedule created successfully", {
        schedule,
      });
    } catch (error) {
      next(error);
    }
  },

  async getSchedules(req: Request, res: Response, next: NextFunction) {
    try {
      const schedules = await adminScheduleService.getAllSchedules();
      return successResponse(res, 201, "Schedules fetched successfully", {
        schedules,
      });
    } catch (error) {
      next(error);
    }
  },

  async assignTrainerToSchedule(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { scheduleId, trainerId } = AssignTrainerToScheduleSchema.parse(
        req.body
      );

      const updatedSchedule =
        await adminScheduleService.assignTrainerToSchedule(
          trainerId,
          scheduleId
        );

      return successResponse(res, 200, "Trainer assigned successfully", {
        updatedSchedule,
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteSchedule(req: Request, res: Response, next: NextFunction) {
    try {
      const { scheduleId } = DeleteScheduleSchema.parse(req.body);

      await adminScheduleService.deleteSchedule(scheduleId);

      return successResponse(res, 200, "Schedule deleted successful");
    } catch (error) {
      next(error);
    }
  },
};
