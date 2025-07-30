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
exports.isTrainee = exports.isTrainer = exports.isAdmin = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const response_1 = require("../utils/response");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        // console.log(token);
        if (!token) {
            return (0, response_1.errorResponse)(res, 401, "Unauthorize access denied");
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield db_1.prisma.user.findUnique({
            where: { id: decoded.id },
        });
        if (!user) {
            return (0, response_1.errorResponse)(res, 401, "Unauthorize access");
        }
        req.user = user; // Attach user to request
        next();
    }
    catch (error) {
        // console.log(error);
        res.status(401).json({ message: "Unauthorized", error });
    }
});
exports.authMiddleware = authMiddleware;
const isAdmin = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "ADMIN") {
        return (0, response_1.errorResponse)(res, 403, "Admin access required");
    }
    next();
};
exports.isAdmin = isAdmin;
const isTrainer = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "TRAINER") {
        return (0, response_1.errorResponse)(res, 403, "Trainer access required");
    }
    next();
};
exports.isTrainer = isTrainer;
const isTrainee = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "TRAINEE") {
        return (0, response_1.errorResponse)(res, 403, "Trainee access required");
    }
    next();
};
exports.isTrainee = isTrainee;
