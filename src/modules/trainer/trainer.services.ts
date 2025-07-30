import { prisma } from "../../config/db";

export const trainerScheduleService = {
  async getTrainerSchedulesById(id: number) {
    return prisma.trainerSchedule.findMany({
      where: { trainerId: id },
      include: {
        bookings: {
          include: {
            trainee: { select: { id: true, name: true, email: true } },
          },
        },
      },
      orderBy: { date: "asc" },
    });
  },
};
