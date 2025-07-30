import { prisma } from "../../config/db";
import { CreateScheduleSchema } from "../../zod/zod";

export const adminScheduleService = {
  async createSchedule(trainerId: number, date: Date, startTime: Date) {
    const trainer = await prisma.user.findUnique({
      where: { id: trainerId },
    });
    if (!trainer || trainer.role !== "TRAINER") {
      throw new Error("Invalid trainer ID");
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const existingSchedules = await prisma.trainerSchedule.count({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (existingSchedules >= 5) {
      throw new Error("Cannot create more than 5 schedules per day");
    }

    // check for overlaping schedule
    const overlappingSchedule = await prisma.trainerSchedule.findFirst({
      where: {
        trainerId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        startTime: startTime,
      },
    });

    if (overlappingSchedule) {
      throw new Error("Trainer already has a schedule at this time");
    }
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 2);

    // Create schedule
    const schedule = await prisma.trainerSchedule.create({
      data: {
        date,
        startTime,
        endTime,
        trainerId,
      },
      include: {
        trainer: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return schedule;
  },

  async getTrainerScheduleByTrainerId(trainerId: number) {
    return prisma.trainerSchedule.findMany({
      where: { trainerId },
      include: { bookings: true },
    });
  },

  async getAllSchedules() {
    return prisma.trainerSchedule.findMany({
      include: { bookings: true, trainer: true },
    });
  },

  async deleteSchedule(id: number) {
    return prisma.trainerSchedule.delete({ where: { id } });
  },

  async assignTrainerToSchedule(trainerId: number, scheduleId: number) {
    const trainer = await prisma.user.findUnique({
      where: { id: trainerId, role: "TRAINER" },
    });
    if (!trainer) throw { status: 404, message: "Trainer not found" };

    const schedule = await prisma.trainerSchedule.findUnique({
      where: { id: scheduleId },
    });
    if (!schedule) throw { status: 404, message: "Schedule not found" };

    return prisma.trainerSchedule.update({
      where: { id: scheduleId },
      data: { trainerId },
      include: { trainer: true },
    });
  },
};
