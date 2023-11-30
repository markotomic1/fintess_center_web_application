import express from "express";
import {
  addPlanControl,
  deletePlanControl,
  getPlanControl,
  getPlansControl,
} from "../controllers/planController";
import { auth, isAdmin } from "../middlewares/auth";
const router = express.Router();

router.post("/add", auth, isAdmin, addPlanControl);
router.get("/getAll", getPlansControl);
router.delete("/:id", auth, isAdmin, deletePlanControl);
router.get("/:planId", auth, isAdmin, getPlanControl);

export default router;
