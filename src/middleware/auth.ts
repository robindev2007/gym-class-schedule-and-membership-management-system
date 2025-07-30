import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db";
import { errorResponse } from "../utils/response";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

interface JwtPayload {
  id: number;
  role: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);
    if (!token) {
      return errorResponse(res, 401, "Unauthorize access denied");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return errorResponse(res, 401, "Unauthorize access");
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    // console.log(error);
    res.status(401).json({ message: "Unauthorized", error });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "ADMIN") {
    return errorResponse(res, 403, "Admin access required");
  }
  next();
};

export const isTrainer = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "TRAINER") {
    return errorResponse(res, 403, "Trainer access required");
  }
  next();
};

export const isTrainee = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "TRAINEE") {
    return errorResponse(res, 403, "Trainee access required");
  }
  next();
};
