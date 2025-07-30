import { prisma } from "../../config/db";

export const PublicScheduleService = {
  async getAvailableSchedules() {
    const schedules = await prisma.trainerSchedule.findMany({
      include: {
        bookings: true,
        trainer: { select: { id: true, name: true, email: true } },
      },
      orderBy: { date: "asc" },
    });

    // Calculate remaining slots
    return schedules.map((schedule) => ({
      id: schedule.id,
      date: schedule.date,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      trainer: schedule.trainer,
      totalBooked: schedule.bookings.length,
      remainingSlots: 10 - schedule.bookings.length,
    }));
  },
};
