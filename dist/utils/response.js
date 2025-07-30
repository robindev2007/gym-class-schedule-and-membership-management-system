"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        success: true,
        statusCode,
        message,
        data,
    });
};
exports.successResponse = successResponse;
const errorResponse = (res, statusCode, message, errorDetails = null) => {
    return res.status(statusCode).json(errorDetails
        ? {
            success: false,
            message,
            errorDetails,
        }
        : {
            success: false,
            message,
        });
};
exports.errorResponse = errorResponse;
