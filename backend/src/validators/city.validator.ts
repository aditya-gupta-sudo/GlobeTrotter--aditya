import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { errorResponse } from "../utils/apiResponse";

export const searchCitiesQuerySchema = z.object({
  q: z
    .string({ error: "Search query is required" })
    .trim()
    .min(1, "Search query is required"),
});

export type SearchCitiesQuery = z.infer<typeof searchCitiesQuerySchema>;

const getQueryValue = (value: unknown): string => {
  if (Array.isArray(value)) {
    return typeof value[0] === "string" ? value[0] : "";
  }

  return typeof value === "string" ? value : "";
};

export const validateSearchQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = searchCitiesQuerySchema.safeParse({
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
