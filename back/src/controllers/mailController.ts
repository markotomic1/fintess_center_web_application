import { NextFunction, Request, Response } from "express";
import { send } from "../services/mailService";

export const sendMail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, fullname, phone, description } = req.body;
    await send(email, fullname, phone, description);

    res.send("Message sent successfully!");
  } catch (error) {
    next(error);
  }
};
