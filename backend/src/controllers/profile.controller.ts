import { Request, Response } from "express";
import * as profileService from "../services/profile.service";
import { ProfileError } from "../services/profile.service";
import { errorResponse, successResponse } from "../utils/apiResponse";
import type { UpdateProfileInput } from "../validators/profile.validator";

const handleProfileError = (res: Response, error: unknown) => {
  if (error instanceof ProfileError) {
    return errorResponse(res, error.message, error.error, error.statusCode);
  }

  return errorResponse(res, "Internal server error", {}, 500);
};

const requireUserId = (req: Request, res: Response): string | null => {
  if (!req.userId) {
    errorResponse(res, "Unauthorized", {}, 401);
    return null;
  }

  return req.userId;
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) {
      return;
    }

    const user = await profileService.getProfile(userId);

    return successResponse(res, "Profile retrieved successfully", { user });
  } catch (error) {
    return handleProfileError(res, error);
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) {
      return;
    }

    const user = await profileService.updateProfile(
      userId,
      req.body as UpdateProfileInput
    );

    return successResponse(res, "Profile updated successfully", { user });
  } catch (error) {
    return handleProfileError(res, error);
  }
};
