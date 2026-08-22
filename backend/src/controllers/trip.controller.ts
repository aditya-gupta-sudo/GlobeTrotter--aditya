import { Request, Response } from "express";
import * as tripService from "../services/trip.service";
import { TripError } from "../services/trip.service";
import { errorResponse, successResponse } from "../utils/apiResponse";
import type {
  CreateTripInput,
  UpdateTripInput,
} from "../validators/trip.validator";

const handleTripError = (res: Response, error: unknown) => {
  if (error instanceof TripError) {
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

const getTripIdParam = (req: Request): string => {
  const tripId = req.params.tripId;
  return Array.isArray(tripId) ? tripId[0] : tripId;
};

export const createTrip = async (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) {
      return;
    }

    const trip = await tripService.createTrip(
      userId,
      req.body as CreateTripInput
    );

    return successResponse(res, "Trip created successfully", { trip }, 201);
  } catch (error) {
    return handleTripError(res, error);
  }
};

export const getTrips = async (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) {
      return;
    }

    const trips = await tripService.getUserTrips(userId);

    return successResponse(res, "Trips retrieved successfully", { trips });
  } catch (error) {
    return handleTripError(res, error);
  }
};

export const getTripById = async (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) {
      return;
    }

    const trip = await tripService.getTripById(userId, getTripIdParam(req));

    return successResponse(res, "Trip retrieved successfully", { trip });
  } catch (error) {
    return handleTripError(res, error);
  }
};

export const updateTrip = async (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) {
      return;
    }

    const trip = await tripService.updateTrip(
      userId,
      getTripIdParam(req),
      req.body as UpdateTripInput
    );

    return successResponse(res, "Trip updated successfully", { trip });
  } catch (error) {
    return handleTripError(res, error);
  }
};

export const deleteTrip = async (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) {
      return;
    }

    await tripService.deleteTrip(userId, getTripIdParam(req));

    return successResponse(res, "Trip deleted successfully", {});
  } catch (error) {
    return handleTripError(res, error);
  }
};
