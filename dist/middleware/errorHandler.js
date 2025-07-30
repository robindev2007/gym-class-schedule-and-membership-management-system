"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);
    // Handle Zod Validation Errors
    if (err instanceof zod_1.ZodError) {
        const firstError = err.issues[0]; // Pick first issue
        return res.status(400).json({
            success: false,
            message: "Validation error occurred.",
            errorDetails: {
                field: firstError.path[0],
                message: firstError.message,
            },
        });
    }
    // Default error
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        errorDetails: err.details || null,
    });
};
exports.errorHandler = errorHandler;
