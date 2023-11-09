import express from "express";
import {
  addTrainingControl,
  getTrainingsController,
  removeTrainingControl,
} from "../controllers/trainingController";
import { auth, isAdmin } from "../middlewares/auth";

const router = express.Router();

router.post("/add", auth, isAdmin, addTrainingControl);
router.get("/", auth, getTrainingsController);
router.delete("/:id", auth, isAdmin, removeTrainingControl);
export default router;
