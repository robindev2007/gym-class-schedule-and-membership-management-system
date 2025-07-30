"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../../middleware/auth");
const schedules_controller_1 = require("./schedules.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", auth_1.authMiddleware, schedules_controller_1.GetSchedules);
exports.default = router;
