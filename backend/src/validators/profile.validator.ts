import { NextFunction, Request, Response } from "express";
import { z, ZodType } from "zod";
import { errorResponse } from "../utils/apiResponse";

export const updateProfileSchema = z
  .object({
    name: z
      .string({ error: "Name is required" })
      .min(1, "Name is required")
      .min(3, "Name must contain at least 3 characters")
      .optional(),
    avatar: z.string().nullable().optional(),
  })
  .strict()
  .refine(
    (data) => data.name !== undefined || data.avatar !== undefined,
    {
      message: "At least one of name or avatar is required",
    }
  );

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

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
