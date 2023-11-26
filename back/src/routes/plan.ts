import express from "express";
import {
  addPlanControl,
  deletePlanControl,
  getPlansControl,
} from "../controllers/planController";
import { auth, isAdmin } from "../middlewares/auth";
const router = express.Router();

router.post("/add", auth, isAdmin, addPlanControl);
router.get("/", getPlansControl);
router.delete("/:id", auth, isAdmin, deletePlanControl);

export default router;
