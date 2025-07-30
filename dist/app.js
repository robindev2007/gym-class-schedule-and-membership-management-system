"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const schedule_routes_1 = __importDefault(require("./modules/admin/schedule.routes"));
const trainer_routes_1 = __importDefault(require("./modules/admin/trainer.routes"));
const trainer_routes_2 = __importDefault(require("./modules/trainer/trainer.routes"));
const trainee_routes_1 = __importDefault(require("./modules/trainee/trainee.routes"));
const schedules_routes_1 = __importDefault(require("./modules/schedules/schedules.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/admin/trainers", trainer_routes_1.default);
app.use("/api/admin/schedules", schedule_routes_1.default);
app.use("/api/trainer", trainer_routes_2.default);
app.use("/api/trainee", trainee_routes_1.default);
app.use("/api/schedule", schedules_routes_1.default);
// error handler
app.use(errorHandler_1.errorHandler);
exports.default = app;
