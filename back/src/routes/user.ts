import {
  changePassword,
  getUser,
  loginUser,
  registerUser,
} from "../controllers/userController";
import express from "express";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.patch("/changePassword", changePassword);
router.get("/getUser/:id", getUser);

export default router;
