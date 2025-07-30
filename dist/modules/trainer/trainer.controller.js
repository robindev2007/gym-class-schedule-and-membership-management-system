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
exports.getAssignedSchedules = void 0;
const trainer_services_1 = require("./trainer.services");
const response_1 = require("../../utils/response");
const getAssignedSchedules = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainerId = req.user.id;
        const schedules = yield trainer_services_1.trainerScheduleService.getTrainerSchedulesById(trainerId);
        return (0, response_1.successResponse)(res, 200, "Assigned schedules retrieved successfully", { schedules });
    }
    catch (error) {
        next(error);
    }
});
exports.getAssignedSchedules = getAssignedSchedules;
