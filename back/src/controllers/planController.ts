import { NextFunction, Request, Response } from "express";
import {
  addPlan,
  deletePlan,
  getPlan,
  getPlans,
} from "../services/planService";
import { CustomError } from "../utils/customError";

export const addPlanControl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const plan = await addPlan(req.body);

    const { id, ...planData } = plan;

    res.status(201).send(planData);
  } catch (error) {
    next(error);
  }
};
export const getPlansControl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const plans = await getPlans();

    res.send(plans);
  } catch (error) {
    next(error);
  }
};

export const deletePlanControl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deletePlan(req.params.id);
    res.send("Successfully deleted plan!");
  } catch (error) {
    next(error);
  }
};
export const getPlanControl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.planId) {
      throw new CustomError("Unable to get plan!", 400);
    }
    const plan = await getPlan(req.params.planId);
    res.send(plan);
  } catch (error) {
    next(error);
  }
};
