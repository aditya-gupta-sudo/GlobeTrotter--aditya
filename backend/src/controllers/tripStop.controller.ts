import { Request, Response } from "express";
import * as tripStopService from "../services/tripStop.service";
import { TripStopError } from "../services/tripStop.service";
import { errorResponse, successResponse } from "../utils/apiResponse";
import type {
  CreateTripStopInput,
  UpdateTripStopInput,
} from "../validators/tripStop.validator";

const handleTripStopError = (res: Response, error: unknown) => {
  if (error instanceof TripStopError) {
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

const getParam = (
  value: string | string[] | undefined
): string => {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
};

export const createTripStop = async (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) {
      return;
    }

    const stop = await tripStopService.createTripStop(
      userId,
      getParam(req.params.tripId),
      req.body as CreateTripStopInput
    );

    return successResponse(
      res,
      "Trip stop created successfully",
      { stop },
      201
    );
  } catch (error) {
    return handleTripStopError(res, error);
  }
};

export const getTripStops = async (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) {
      return;
    }

    const stops = await tripStopService.getTripStops(
      userId,
      getParam(req.params.tripId)
    );

    return successResponse(res, "Trip stops retrieved successfully", { stops });
  } catch (error) {
    return handleTripStopError(res, error);
  }
};

export const updateTripStop = async (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) {
      return;
    }

    const stop = await tripStopService.updateTripStop(
      userId,
      getParam(req.params.stopId),
      req.body as UpdateTripStopInput
    );

    return successResponse(res, "Trip stop updated successfully", { stop });
  } catch (error) {
    return handleTripStopError(res, error);
  }
};

export const deleteTripStop = async (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) {
      return;
    }

    await tripStopService.deleteTripStop(userId, getParam(req.params.stopId));

    return successResponse(res, "Trip stop deleted successfully", {});
  } catch (error) {
    return handleTripStopError(res, error);
  }
};
