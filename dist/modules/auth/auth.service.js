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
exports.login = exports.sighup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../../config/db");
const jwt_1 = require("../../utils/jwt");
const sighup = (name, email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const userExist = yield db_1.prisma.user.findFirst({ where: { email } });
        if (userExist)
            throw new Error("User with this Email already exist");
        const user = yield db_1.prisma.user.create({
            data: { email, name, password: hashedPassword, role },
        });
        const token = (0, jwt_1.generateToken)({ id: user.id, role: user.role });
        return { data: { user, token } };
    }
    catch (error) {
        return { error: error.message || "Signup error" };
    }
});
exports.sighup = sighup;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({ where: { email } });
    if (!user)
        return { error: { message: "Invalid credentials" } };
    const valid = yield bcrypt_1.default.compare(password, user.password);
    if (!valid)
        return { error: { message: "Invalid credentials" } };
    const token = (0, jwt_1.generateToken)({ id: user.id, role: user.role });
    return { data: { user, token } };
});
exports.login = login;
