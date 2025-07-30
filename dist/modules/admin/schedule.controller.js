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
exports.AdminScheduleController = void 0;
const zod_1 = require("../../zod/zod");
const schedule_service_1 = require("./schedule.service");
const response_1 = require("../../utils/response");
exports.AdminScheduleController = {
    createSchedule(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date, startTime, trainerId } = zod_1.CreateScheduleSchema.parse(req.body);
                const schedule = yield schedule_service_1.adminScheduleService.createSchedule(trainerId, date, startTime);
                return (0, response_1.successResponse)(res, 201, "Schedule created successfully", {
                    schedule,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    getSchedules(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schedules = yield schedule_service_1.adminScheduleService.getAllSchedules();
                return (0, response_1.successResponse)(res, 201, "Schedules fetched successfully", {
                    schedules,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    assignTrainerToSchedule(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { scheduleId, trainerId } = zod_1.AssignTrainerToScheduleSchema.parse(req.body);
                const updatedSchedule = yield schedule_service_1.adminScheduleService.assignTrainerToSchedule(trainerId, scheduleId);
                return (0, response_1.successResponse)(res, 200, "Trainer assigned successfully", {
                    updatedSchedule,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    deleteSchedule(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { scheduleId } = zod_1.DeleteScheduleSchema.parse(req.body);
                yield schedule_service_1.adminScheduleService.deleteSchedule(scheduleId);
                return (0, response_1.successResponse)(res, 200, "Schedule deleted successful");
            }
            catch (error) {
                next(error);
            }
        });
    },
};
