import { Router } from "express";
import {
  assignActivityToStop,
  getActivities,
  getActivitiesByCity,
  removeActivityFromStop,
  searchActivities,
  seedActivities,
} from "../controllers/activity.controller";
import { authenticate } from "../middlewares/auth.middleware";
import {
  assignActivitySchema,
  validate,
  validateActivityIdParam,
  validateCityIdParam,
  validateSearchQuery,
  validateStopIdParam,
} from "../validators/activity.validator";

const router = Router();

router.post("/seed", seedActivities);
router.get("/search", validateSearchQuery, searchActivities);
router.get("/city/:cityId", validateCityIdParam, getActivitiesByCity);
router.get("/", getActivities);

export const stopActivityRouter = Router();

stopActivityRouter.use(authenticate);

stopActivityRouter.post(
  "/:stopId/activity",
  validateStopIdParam,
  validate(assignActivitySchema),
  assignActivityToStop
);

stopActivityRouter.delete(
  "/:stopId/activity/:activityId",
  validateStopIdParam,
  validateActivityIdParam,
  removeActivityFromStop
);

export default router;
