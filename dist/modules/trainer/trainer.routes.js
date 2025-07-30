"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../../middleware/auth");
const trainer_controller_1 = require("./trainer.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/schedules", auth_1.authMiddleware, auth_1.isTrainer, trainer_controller_1.getAssignedSchedules);
exports.default = router;
