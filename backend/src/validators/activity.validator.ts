import { NextFunction, Request, Response } from "express";
import { z, ZodType } from "zod";
import { errorResponse } from "../utils/apiResponse";

const uuidField = (field: string) =>
  z.string({ error: `${field} is required` }).uuid(`Invalid ${field}`);

const getQueryValue = (value: unknown): string => {
  if (Array.isArray(value)) {
    return typeof value[0] === "string" ? value[0] : "";
  }

  return typeof value === "string" ? value : "";
};

const getParamValue = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
};

export const searchActivitiesQuerySchema = z.object({
  q: z
    .string({ error: "Search query is required" })
    .trim()
    .min(1, "Search query is required"),
});

export const cityIdParamSchema = z.object({
  cityId: uuidField("cityId"),
});

export const stopIdParamSchema = z.object({
  stopId: uuidField("stopId"),
});

export const activityIdParamSchema = z.object({
  activityId: uuidField("activityId"),
});

export const assignActivitySchema = z.object({
  activityId: uuidField("activityId"),
  dayNumber: z.coerce
    .number({ error: "dayNumber is required" })
    .int("dayNumber must be an integer")
    .positive("dayNumber must be greater than 0")
    .default(1),
  startTime: z.string().trim().min(1, "startTime cannot be empty").optional(),
  notes: z.string().trim().optional(),
});

export type SearchActivitiesQuery = z.infer<typeof searchActivitiesQuerySchema>;
export type AssignActivityInput = z.infer<typeof assignActivitySchema>;

export const validate =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));

      return errorResponse(res, "Validation failed", { details }, 400);
    }

    req.body = result.data;
    return next();
  };

export const validateSearchQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = searchActivitiesQuerySchema.safeParse({
    q: getQueryValue(req.query.q),
  });

  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));

    return errorResponse(res, "Validation failed", { details }, 400);
  }

  req.query.q = result.data.q;
  return next();
};

export const validateCityIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = cityIdParamSchema.safeParse({
    cityId: getParamValue(req.params.cityId),
  });

  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));

    return errorResponse(res, "Validation failed", { details }, 400);
  }

  req.params.cityId = result.data.cityId;
  return next();
};

export const validateStopIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = stopIdParamSchema.safeParse({
    stopId: getParamValue(req.params.stopId),
  });

  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));

    return errorResponse(res, "Validation failed", { details }, 400);
  }

  req.params.stopId = result.data.stopId;
  return next();
};

export const validateActivityIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = activityIdParamSchema.safeParse({
    activityId: getParamValue(req.params.activityId),
  });

  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));

    return errorResponse(res, "Validation failed", { details }, 400);
  }

  req.params.activityId = result.data.activityId;
  return next();
};
