"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraineeServices = void 0;
const db_1 = require("../../config/db");
exports.TraineeServices = {
    bookSchedule(userId, scheduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const schedule = yield db_1.prisma.trainerSchedule.findUnique({
                where: { id: scheduleId },
                include: { bookings: true },
            });
            if (!schedule)
                throw new Error("Schedule not found");
            // check booking limit
            if (schedule.bookings.length >= 10) {
                throw new Error("Class schedule is full. Maximum 10 trainees allowed.");
            }
            // overlapping booking check
            const overlappingBooking = yield db_1.prisma.booking.findFirst({
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
            const booking = yield db_1.prisma.booking.create({
                data: {
                    traineeId: userId,
                    scheduleId,
                },
                include: {
                    schedule: true,
                },
            });
            return booking;
        });
    },
    cancelBooking(userId, bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield db_1.prisma.booking.findUnique({
                where: { id: bookingId },
            });
            if (!booking || booking.traineeId !== userId) {
                throw new Error("Booking not found or not authorized");
            }
            yield db_1.prisma.booking.delete({
                where: { id: bookingId },
            });
            return { message: "Booking canceled successfully" };
        });
    },
    getMyBookings(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prisma.booking.findMany({
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
        });
    },
};
