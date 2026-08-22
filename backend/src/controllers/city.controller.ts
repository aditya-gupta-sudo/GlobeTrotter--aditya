import { Request, Response } from "express";
import * as cityService from "../services/city.service";
import { CityError } from "../services/city.service";
import { errorResponse, successResponse } from "../utils/apiResponse";

const handleCityError = (res: Response, error: unknown) => {
  if (error instanceof CityError) {
    return errorResponse(res, error.message, error.error, error.statusCode);
  }

  return errorResponse(res, "Internal server error", {}, 500);
};

const getQueryParam = (value: unknown): string => {
  if (Array.isArray(value)) {
    return typeof value[0] === "string" ? value[0] : "";
  }

  return typeof value === "string" ? value : "";
};

export const getCities = async (_req: Request, res: Response) => {
  try {
    const cities = await cityService.getCities();
    return successResponse(res, "Cities retrieved successfully", { cities });
  } catch (error) {
    return handleCityError(res, error);
  }
};

export const searchCities = async (req: Request, res: Response) => {
  try {
    const cities = await cityService.searchCities(getQueryParam(req.query.q));
    return successResponse(res, "Cities retrieved successfully", { cities });
  } catch (error) {
    return handleCityError(res, error);
  }
};

export const seedCities = async (_req: Request, res: Response) => {
  try {
    const data = await cityService.seedCities();
    return successResponse(res, "Cities seeded successfully", data);
  } catch (error) {
    return handleCityError(res, error);
  }
};
