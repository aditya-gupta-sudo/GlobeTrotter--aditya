import { NextFunction, Request, Response } from "express";
import { z, ZodType } from "zod";
import { errorResponse } from "../utils/apiResponse";

export const registerSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(1, "Name is required")
    .min(3, "Name must contain at least 3 characters"),
  email: z
    .string({ error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string({ error: "Password is required" })
    .min(6, "Password must contain at least 6 characters"),
});

export const loginSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string({ error: "Password is required" })
    .min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

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
