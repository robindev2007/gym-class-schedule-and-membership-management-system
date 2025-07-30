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
exports.PublicScheduleService = void 0;
const db_1 = require("../../config/db");
exports.PublicScheduleService = {
    getAvailableSchedules() {
        return __awaiter(this, void 0, void 0, function* () {
            const schedules = yield db_1.prisma.trainerSchedule.findMany({
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
        });
    },
};
