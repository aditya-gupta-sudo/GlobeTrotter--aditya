import { Router } from "express";
import {
  createTrip,
  deleteTrip,
  getTripById,
  getTrips,
  updateTrip,
} from "../controllers/trip.controller";
import { authenticate } from "../middlewares/auth.middleware";
import {
  createTripSchema,
  updateTripSchema,
  validate,
  validateTripIdParam,
} from "../validators/trip.validator";

const router = Router();

router.use(authenticate);

router.post("/", validate(createTripSchema), createTrip);
router.get("/", getTrips);
router.get("/:tripId", validateTripIdParam, getTripById);
router.put("/:tripId", validateTripIdParam, validate(updateTripSchema), updateTrip);
router.delete("/:tripId", validateTripIdParam, deleteTrip);

export default router;
