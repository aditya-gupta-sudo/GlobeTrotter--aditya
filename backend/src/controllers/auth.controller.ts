import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { AuthError } from "../services/auth.service";
import { errorResponse, successResponse } from "../utils/apiResponse";
import type { LoginInput, RegisterInput } from "../validators/auth.validator";

const handleAuthError = (res: Response, error: unknown) => {
  if (error instanceof AuthError) {
    return errorResponse(res, error.message, error.error, error.statusCode);
  }

  return errorResponse(res, "Internal server error", {}, 500);
};

export const register = async (req: Request, res: Response) => {
  try {
    const data = await authService.register(req.body as RegisterInput);
    return successResponse(res, "User registered successfully", data, 201);
  } catch (error) {
    return handleAuthError(res, error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = await authService.login(req.body as LoginInput);
    return successResponse(res, "Login successful", data);
  } catch (error) {
    return handleAuthError(res, error);
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return errorResponse(res, "Unauthorized", {}, 401);
    }

    const user = await authService.getCurrentUser(req.userId);
    return successResponse(res, "User retrieved successfully", { user });
  } catch (error) {
    return handleAuthError(res, error);
  }
};
