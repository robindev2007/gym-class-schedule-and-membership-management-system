"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.loginController = exports.signupController = void 0;
const AuthService = __importStar(require("./auth.service"));
const zod_1 = require("../../zod/zod");
const response_1 = require("../../utils/response");
const signupController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return (0, response_1.errorResponse)(res, 400, "Request body not provided");
        }
        const parsed = zod_1.UserSchema.safeParse(req.body);
        if (!parsed.success) {
            const firstError = parsed.error.issues[0];
            return (0, response_1.errorResponse)(res, 401, "Validation error", {
                field: firstError.path[0],
                message: firstError.message,
            });
        }
        const { name, email, password } = req.body;
        const { error, data } = yield AuthService.sighup(name, email, password, "TRAINEE");
        if (error)
            return (0, response_1.errorResponse)(res, 401, error.message, error);
        return (0, response_1.successResponse)(res, 201, "Sighup success", data);
    }
    catch (error) {
        next(error);
    }
});
exports.signupController = signupController;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || Object.keys(req.body).length === 0)
            return (0, response_1.errorResponse)(res, 401, "No email or password provided", {
                fields: "password, email",
                message: "Invalid email and password",
            });
        const parsed = zod_1.UserLoginSchema.safeParse(req.body);
        if (!parsed.success) {
            const firstError = parsed.error.issues[0];
            return (0, response_1.errorResponse)(res, 401, "Validation error", {
                field: firstError.path[0],
                message: firstError.message,
            });
        }
        const { email, password } = req.body;
        const { data: result, error } = yield AuthService.login(email, password);
        if (error)
            return (0, response_1.errorResponse)(res, 402, error.message || "Login unsuccessful", error);
        return res.json(Object.assign({ success: true }, result));
    }
    catch (error) {
        // return errorResponse(res, 401, "Invalid credential");
        // next(error);
    }
});
exports.loginController = loginController;
