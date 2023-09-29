import { auth } from "../middlewares/auth";
import {
  changePassword,
  getLoggedInUser,
  getUser,
  loginUser,
  registerUser,
} from "../controllers/userController";
import express from "express";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.patch("/changePassword", auth, changePassword);
router.get("/getUser/:id", auth, getUser);
router.get("/me", auth, getLoggedInUser);

export default router;
