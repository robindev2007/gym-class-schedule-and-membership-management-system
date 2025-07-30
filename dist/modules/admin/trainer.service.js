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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminTrainerService = void 0;
const db_1 = require("../../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.adminTrainerService = {
    createTrainer(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // check if user already exist
            const existing = yield db_1.prisma.user.findUnique({ where: { email } });
            if (existing)
                throw { status: 400, message: "Email already exist" };
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            return yield db_1.prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role: "TRAINER",
                },
            });
        });
    },
    getAllTrainer() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.user.findMany({ where: { role: "TRAINER" } });
        });
    },
    deleteTrainer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.user.delete({ where: { id } });
        });
    },
    getTrainerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainer = yield db_1.prisma.user.findUnique({
                where: { id, role: "TRAINER" },
            });
            if (!trainer) {
                throw new Error("Trainer not found");
            }
        });
    },
};
