import { NextFunction, Request, Response } from "express";
import { payment, verifySession } from "../services/paymentService";
import { CustomError } from "../utils/customError";

export const paymentControl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const url = await payment(req.body.plan);
    if (!url) {
      throw new CustomError("An error occured", 500);
    }
    res.send(url);
  } catch (error) {
    next(error);
  }
};
export const verifySessionControl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = await verifySession(req.body.session_id);
    res.send(productId);
  } catch (error) {
    next(error);
  }
};
