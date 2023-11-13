import express from "express";
import {
  addNewsControl,
  deleteNewsControl,
  getNewsControl,
} from "../controllers/newsController";
import { auth, isAdmin } from "../middlewares/auth";
const router = express.Router();

router.post("/", auth, isAdmin, addNewsControl);
router.get("/", auth, getNewsControl);
router.delete("/:id", auth, isAdmin, deleteNewsControl);

export default router;
