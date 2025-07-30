import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response";
import { ZodError } from "zod";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
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
