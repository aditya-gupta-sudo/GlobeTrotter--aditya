import { Router } from "express";
import {
  getCities,
  searchCities,
  seedCities,
} from "../controllers/city.controller";
import { validateSearchQuery } from "../validators/city.validator";

const router = Router();

router.post("/seed", seedCities);
router.get("/search", validateSearchQuery, searchCities);
router.get("/", getCities);

export default router;
