import { auth } from "../middlewares/auth";
import {
  changePassword,
  getLoggedInUser,
  getUser,
  loginUser,
  logoutUser,
  purchasePlanControl,
  registerUser,
  storeImgUrlControl,
  updateUserControl,
} from "../controllers/userController";
import express from "express";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.patch("/changePassword", auth, changePassword);
router.get("/getUser/:id", auth, getUser);
router.get("/me", auth, getLoggedInUser);
router.post("/logout", auth, logoutUser);
router.patch("/", auth, updateUserControl);
router.patch("/purchasePlan", auth, purchasePlanControl);
router.patch("/storeImg", auth, storeImgUrlControl);

export default router;
