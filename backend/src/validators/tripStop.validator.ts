import { NextFunction, Request, Response } from "express";
import { z, ZodType } from "zod";
import { errorResponse } from "../utils/apiResponse";

const uuidField = (field: string) =>
  z.string({ error: `${field} is required` }).uuid(`Invalid ${field}`);

const stopOrderSchema = z.coerce
  .number({ error: "stopOrder is required" })
  .int("stopOrder must be an integer")
  .positive("stopOrder must be greater than 0");

export const createTripStopSchema = z
  .object({
    cityId: uuidField("cityId"),
    arrivalDate: z.coerce.date({ error: "arrivalDate is required" }),
    departureDate: z.coerce.date({ error: "departureDate is required" }),
    stopOrder: stopOrderSchema,
  })
  .refine((data) => data.arrivalDate <= data.departureDate, {
    message: "arrivalDate must be on or before departureDate",
    path: ["departureDate"],
  });

export const updateTripStopSchema = z
  .object({
    cityId: uuidField("cityId").optional(),
    arrivalDate: z.coerce.date().optional(),
    departureDate: z.coerce.date().optional(),
    stopOrder: stopOrderSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.arrivalDate && data.departureDate) {
        return data.arrivalDate <= data.departureDate;
      }
      return true;
    },
    {
      message: "arrivalDate must be on or before departureDate",
      path: ["departureDate"],
    }
  );

export const tripIdParamSchema = z.object({
  tripId: uuidField("tripId"),
});

export const stopIdParamSchema = z.object({
  stopId: uuidField("stopId"),
});

export type CreateTripStopInput = z.infer<typeof createTripStopSchema>;
export type UpdateTripStopInput = z.infer<typeof updateTripStopSchema>;

const getParamValue = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
};

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

export const validateTripIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = tripIdParamSchema.safeParse({
    tripId: getParamValue(req.params.tripId),
  });

  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));

    return errorResponse(res, "Validation failed", { details }, 400);
  }

  req.params.tripId = result.data.tripId;
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
