import { Response } from "express";

export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data = null as any
) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  errorDetails = null as unknown as object
) => {
  return res.status(statusCode).json(
    errorDetails
      ? {
          success: false,
          message,
          errorDetails,
        }
      : {
          success: false,
          message,
        }
  );
};
