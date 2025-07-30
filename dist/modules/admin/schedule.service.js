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
exports.adminScheduleService = void 0;
const db_1 = require("../../config/db");
exports.adminScheduleService = {
    createSchedule(trainerId, date, startTime) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainer = yield db_1.prisma.user.findUnique({
                where: { id: trainerId },
            });
            if (!trainer || trainer.role !== "TRAINER") {
                throw new Error("Invalid trainer ID");
            }
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            const existingSchedules = yield db_1.prisma.trainerSchedule.count({
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
            const overlappingSchedule = yield db_1.prisma.trainerSchedule.findFirst({
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
            const schedule = yield db_1.prisma.trainerSchedule.create({
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
        });
    },
    getTrainerScheduleByTrainerId(trainerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prisma.trainerSchedule.findMany({
                where: { trainerId },
                include: { bookings: true },
            });
        });
    },
    getAllSchedules() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prisma.trainerSchedule.findMany({
                include: { bookings: true, trainer: true },
            });
        });
    },
    deleteSchedule(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prisma.trainerSchedule.delete({ where: { id } });
        });
    },
    assignTrainerToSchedule(trainerId, scheduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainer = yield db_1.prisma.user.findUnique({
                where: { id: trainerId, role: "TRAINER" },
            });
            if (!trainer)
                throw { status: 404, message: "Trainer not found" };
            const schedule = yield db_1.prisma.trainerSchedule.findUnique({
                where: { id: scheduleId },
            });
            if (!schedule)
                throw { status: 404, message: "Schedule not found" };
            return db_1.prisma.trainerSchedule.update({
                where: { id: scheduleId },
                data: { trainerId },
                include: { trainer: true },
            });
        });
    },
};
