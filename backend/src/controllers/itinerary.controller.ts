import { Request, Response } from "express";
import * as itineraryService from "../services/itinerary.service";
import { ItineraryError } from "../services/itinerary.service";
import { errorResponse, successResponse } from "../utils/apiResponse";

const handleItineraryError = (res: Response, error: unknown) => {
  if (error instanceof ItineraryError) {
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

export const getTripItinerary = async (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) {
      return;
    }

    const data = await itineraryService.getTripItinerary(
      userId,
      getParam(req.params.tripId)
    );

    return successResponse(res, "Itinerary retrieved successfully", data);
  } catch (error) {
    return handleItineraryError(res, error);
  }
};
