import { Request, Response } from "express";
import * as activityService from "../services/activity.service";
import { ActivityError } from "../services/activity.service";
import { errorResponse, successResponse } from "../utils/apiResponse";
import type { AssignActivityInput } from "../validators/activity.validator";

const handleActivityError = (res: Response, error: unknown) => {
  if (error instanceof ActivityError) {
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

const getParam = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
};

const getQueryParam = (value: unknown): string => {
  if (Array.isArray(value)) {
    return typeof value[0] === "string" ? value[0] : "";
  }

  return typeof value === "string" ? value : "";
};

export const getActivities = async (_req: Request, res: Response) => {
  try {
    const activities = await activityService.getActivities();
    return successResponse(res, "Activities retrieved successfully", {
      activities,
    });
  } catch (error) {
    return handleActivityError(res, error);
  }
};

export const searchActivities = async (req: Request, res: Response) => {
  try {
    const activities = await activityService.searchActivities(
      getQueryParam(req.query.q)
    );
    return successResponse(res, "Activities retrieved successfully", {
      activities,
    });
  } catch (error) {
    return handleActivityError(res, error);
  }
};

export const getActivitiesByCity = async (req: Request, res: Response) => {
  try {
    const activities = await activityService.getActivitiesByCity(
      getParam(req.params.cityId)
    );
    return successResponse(res, "Activities retrieved successfully", {
      activities,
    });
  } catch (error) {
    return handleActivityError(res, error);
  }
};

export const seedActivities = async (_req: Request, res: Response) => {
  try {
    const data = await activityService.seedActivities();
    return successResponse(res, "Activities seeded successfully", data);
  } catch (error) {
    return handleActivityError(res, error);
  }
};

export const assignActivityToStop = async (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) {
      return;
    }

    const assignment = await activityService.assignActivityToStop(
      userId,
      getParam(req.params.stopId),
      req.body as AssignActivityInput
    );

    return successResponse(
      res,
      "Activity assigned successfully",
      { assignment },
      201
    );
  } catch (error) {
    return handleActivityError(res, error);
  }
};

export const removeActivityFromStop = async (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) {
      return;
    }

    await activityService.removeActivityFromStop(
      userId,
      getParam(req.params.stopId),
      getParam(req.params.activityId)
    );

    return successResponse(res, "Assigned activity removed successfully", {});
  } catch (error) {
    return handleActivityError(res, error);
  }
};
