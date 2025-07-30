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
exports.GetSchedules = void 0;
const schedules_services_1 = require("./schedules.services");
const response_1 = require("../../utils/response");
const GetSchedules = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedules = yield schedules_services_1.PublicScheduleService.getAvailableSchedules();
        return (0, response_1.successResponse)(res, 200, "Available schedules retrieved", {
            schedules,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.GetSchedules = GetSchedules;
