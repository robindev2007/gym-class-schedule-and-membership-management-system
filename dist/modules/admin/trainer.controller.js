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
exports.deleteTrainer = exports.getAllTrainer = exports.createTrainer = void 0;
const trainer_service_1 = require("./trainer.service");
const zod_1 = require("../../zod/zod");
const response_1 = require("../../utils/response");
const db_1 = require("../../config/db");
const createTrainer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate data
        const { email, name, password } = zod_1.CreateTrainerSchema.parse(req.body);
        const trainer = yield trainer_service_1.adminTrainerService.createTrainer(name, email, password);
        return (0, response_1.successResponse)(res, 201, "Trainer created successful", { trainer });
    }
    catch (error) {
        next(error);
    }
});
exports.createTrainer = createTrainer;
const getAllTrainer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainerList = yield trainer_service_1.adminTrainerService.getAllTrainer();
        return (0, response_1.successResponse)(res, 200, "trainer schedule fetch successful", {
            trainerList,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTrainer = getAllTrainer;
const deleteTrainer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate data
        const id = Number(req.params.id);
        const trainer = yield db_1.prisma.user.findUnique({
            where: { id, role: "TRAINER" },
        });
        if (!trainer) {
            return (0, response_1.errorResponse)(res, 404, "Trainer not found or not a trainer.");
        }
        yield trainer_service_1.adminTrainerService.deleteTrainer(id);
        (0, response_1.successResponse)(res, 200, "Trainer deleted successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTrainer = deleteTrainer;
