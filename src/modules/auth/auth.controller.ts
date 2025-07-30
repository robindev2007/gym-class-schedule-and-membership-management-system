import { NextFunction, Request, response, Response } from "express";
import * as AuthService from "./auth.service";
import { UserLoginSchema, UserSchema } from "../../zod/zod";
import { errorResponse, successResponse } from "../../utils/response";

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return errorResponse(res, 400, "Request body not provided");
    }

    const parsed = UserSchema.safeParse(req.body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];

      return errorResponse(res, 401, "Validation error", {
        field: firstError.path[0],
        message: firstError.message,
      });
    }

    const { name, email, password } = req.body;

    const { error, data } = await AuthService.sighup(
      name,
      email,
      password,
      "TRAINEE"
    );

    if (error) return errorResponse(res, 401, error.message, error);

    return successResponse(res, 201, "Sighup success", data);
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0)
      return errorResponse(res, 401, "No email or password provided", {
        fields: "password, email",
        message: "Invalid email and password",
      });

    const parsed = UserLoginSchema.safeParse(req.body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];

      return errorResponse(res, 401, "Validation error", {
        field: firstError.path[0],
        message: firstError.message,
      });
    }

    const { email, password } = req.body;

    const { data: result, error } = await AuthService.login(email, password);

    if (error)
      return errorResponse(
        res,
        402,
        error.message || "Login unsuccessful",
        error
      );
    return res.json({ success: true, ...result });
  } catch (error) {
    // return errorResponse(res, 401, "Invalid credential");
    // next(error);
  }
};
