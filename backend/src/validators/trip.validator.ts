import { NextFunction, Request, Response } from "express";
import { z, ZodType } from "zod";
import { errorResponse } from "../utils/apiResponse";

const visibilitySchema = z.enum(["PUBLIC", "PRIVATE"]);

export const createTripSchema = z
  .object({
    title: z
      .string({ error: "Title is required" })
      .min(1, "Title is required"),
    description: z.string().nullable().optional(),
    coverImage: z.string().nullable().optional(),
    startDate: z.coerce.date({ error: "Start date is required" }),
    endDate: z.coerce.date({ error: "End date is required" }),
    visibility: visibilitySchema.optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be on or after start date",
    path: ["endDate"],
  });

export const updateTripSchema = z
  .object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().nullable().optional(),
    coverImage: z.string().nullable().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    visibility: visibilitySchema.optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate >= data.startDate;
      }
      return true;
    },
    {
      message: "End date must be on or after start date",
      path: ["endDate"],
    }
  );

export const tripIdParamSchema = z.object({
  tripId: z.string().uuid("Invalid trip id"),
});

export type CreateTripInput = z.infer<typeof createTripSchema>;
export type UpdateTripInput = z.infer<typeof updateTripSchema>;

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
  const rawTripId = req.params.tripId;
  const tripId = Array.isArray(rawTripId) ? rawTripId[0] : rawTripId;
  const result = tripIdParamSchema.safeParse({ tripId });

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
