import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller";
import { authenticate } from "../middlewares/auth.middleware";
import {
  updateProfileSchema,
  validate,
} from "../validators/profile.validator";

const router = Router();

router.use(authenticate);

router.get("/", getProfile);
router.put("/", validate(updateProfileSchema), updateProfile);

export default router;
