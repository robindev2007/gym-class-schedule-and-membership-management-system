import { NextFunction, Request, Response } from "express";
import { TraineeServices } from "./trainee.services";
import { successResponse } from "../../utils/response";
import { BookTraineeScheduleSchema, CancelBookingSchema } from "../../zod/zod";

export const bookTraineeSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const { scheduleId } = BookTraineeScheduleSchema.parse(req.body);

    const booking = await TraineeServices.bookSchedule(userId, scheduleId);
    return successResponse(res, 201, "Class booked successfully", { booking });
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const { id: bookingId } = CancelBookingSchema.parse({
      id: parseInt(req.params.id),
    });

    const result = await TraineeServices.cancelBooking(userId, bookingId);

    return successResponse(res, 200, result.message);
  } catch (error) {
    next(error);
  }
};

export const getMyBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const bookings = await TraineeServices.getMyBookings(userId);

    return successResponse(
      res,
      200,
      "Your bookings retrieved successfully",
      bookings
    );
  } catch (error) {
    next(error);
  }
};
