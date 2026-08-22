import { Router } from "express";
import {
  createTripStop,
  deleteTripStop,
  getTripStops,
  updateTripStop,
} from "../controllers/tripStop.controller";
import { authenticate } from "../middlewares/auth.middleware";
import {
  createTripStopSchema,
  updateTripStopSchema,
  validate,
  validateStopIdParam,
  validateTripIdParam,
} from "../validators/tripStop.validator";

export const tripNestedStopRouter = Router();

tripNestedStopRouter.use(authenticate);

tripNestedStopRouter.post(
  "/:tripId/stops",
  validateTripIdParam,
  validate(createTripStopSchema),
  createTripStop
);

tripNestedStopRouter.get(
  "/:tripId/stops",
  validateTripIdParam,
  getTripStops
);

const tripStopRouter = Router();

tripStopRouter.use(authenticate);

tripStopRouter.put(
  "/:stopId",
  validateStopIdParam,
  validate(updateTripStopSchema),
  updateTripStop
);

tripStopRouter.delete("/:stopId", validateStopIdParam, deleteTripStop);

export default tripStopRouter;
