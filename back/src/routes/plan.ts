import express from "express";
import {
  addPlanControl,
  deletePlanControl,
  getPlansControl,
  purchasePlanControl,
} from "../controllers/planController";
import { auth, isAdmin } from "../middlewares/auth";
const router = express.Router();

router.post("/add", auth, isAdmin, addPlanControl);
router.get("/", getPlansControl);
router.delete("/:id", auth, isAdmin, deletePlanControl);
router.patch("/purchasePlan", auth, purchasePlanControl);

export default router;
