import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";
import { getTripItinerary } from "../controllers/itinerary.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { errorResponse } from "../utils/apiResponse";

const tripIdParamSchema = z.object({
  tripId: z
    .string({ error: "tripId is required" })
    .uuid("Invalid tripId"),
});

const getParamValue = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
};

const validateTripIdParam = (
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

const router = Router();

router.use(authenticate);

router.get("/trip/:tripId", validateTripIdParam, getTripItinerary);

export default router;
