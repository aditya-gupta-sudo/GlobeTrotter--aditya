import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { errorResponse } from "../utils/apiResponse";

interface JwtPayload {
  userId: string;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, "Unauthorized", {}, 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return errorResponse(res, "Unauthorized", {}, 401);
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    if (!decoded.userId) {
      return errorResponse(res, "Unauthorized", {}, 401);
    }

    req.userId = decoded.userId;
    return next();
  } catch {
    return errorResponse(res, "Unauthorized", {}, 401);
  }
};
