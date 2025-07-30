import { prisma } from "../../config/db";

export const TraineeServices = {
  async bookSchedule(userId: number, scheduleId: number) {
    const schedule = await prisma.trainerSchedule.findUnique({
      where: { id: scheduleId },
      include: { bookings: true },
    });

    if (!schedule) throw new Error("Schedule not found");

    // check booking limit
    if (schedule.bookings.length >= 10) {
      throw new Error("Class schedule is full. Maximum 10 trainees allowed.");
    }

    // overlapping booking check
    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        traineeId: userId,
        schedule: {
          date: schedule.date,
          startTime: schedule.startTime,
        },
      },
    });

    if (overlappingBooking) {
      throw new Error("You already booked anther class in this time slot");
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        traineeId: userId,
        scheduleId,
      },
      include: {
        schedule: true,
      },
    });

    return booking;
  },

  async cancelBooking(userId: number, bookingId: number) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking || booking.traineeId !== userId) {
      throw new Error("Booking not found or not authorized");
    }

    await prisma.booking.delete({
      where: { id: bookingId },
    });

    return { message: "Booking canceled successfully" };
  },

  async getMyBookings(userId: number) {
    return prisma.booking.findMany({
      where: { traineeId: userId },
      include: {
        schedule: {
          include: {
            trainer: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },
};
