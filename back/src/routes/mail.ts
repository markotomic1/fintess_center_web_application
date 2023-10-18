import express from "express";
import { sendMail } from "../controllers/mailController";

const router = express.Router();

router.post("/send", sendMail);

export default sendMail;
