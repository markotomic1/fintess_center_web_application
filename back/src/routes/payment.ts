import express from "express";
import { auth } from "../middlewares/auth";
import {
  paymentControl,
  verifySessionControl,
} from "../controllers/paymentController";
const router = express.Router();

router.post("/", auth, paymentControl);
router.post("/verifySession", auth, verifySessionControl);

export default router;
