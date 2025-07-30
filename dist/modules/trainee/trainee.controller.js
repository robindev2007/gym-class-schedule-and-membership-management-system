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
exports.getMyBookings = exports.cancelBooking = exports.bookTraineeSchedule = void 0;
const trainee_services_1 = require("./trainee.services");
const response_1 = require("../../utils/response");
const zod_1 = require("../../zod/zod");
const bookTraineeSchedule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { scheduleId } = zod_1.BookTraineeScheduleSchema.parse(req.body);
        const booking = yield trainee_services_1.TraineeServices.bookSchedule(userId, scheduleId);
        return (0, response_1.successResponse)(res, 201, "Class booked successfully", { booking });
    }
    catch (error) {
        next(error);
    }
});
exports.bookTraineeSchedule = bookTraineeSchedule;
const cancelBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { id: bookingId } = zod_1.CancelBookingSchema.parse({
            id: parseInt(req.params.id),
        });
        const result = yield trainee_services_1.TraineeServices.cancelBooking(userId, bookingId);
        return (0, response_1.successResponse)(res, 200, result.message);
    }
    catch (error) {
        next(error);
    }
});
exports.cancelBooking = cancelBooking;
const getMyBookings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const bookings = yield trainee_services_1.TraineeServices.getMyBookings(userId);
        return (0, response_1.successResponse)(res, 200, "Your bookings retrieved successfully", bookings);
    }
    catch (error) {
        next(error);
    }
});
exports.getMyBookings = getMyBookings;
