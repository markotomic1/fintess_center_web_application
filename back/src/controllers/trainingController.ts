import { NextFunction, Request, Response } from "express";
import {
  addTraining,
  getTrainings,
  removeTraining,
} from "../services/trainingService";

//addd training controller

export const addTrainingControl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, time, day } = req.body;
    const training = await addTraining(name, time, day);

    res.status(201).send(training);
  } catch (error) {
    next(error);
  }
};

//get trainings controller

export const getTrainingsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trainings = await getTrainings();

    res.send(trainings);
  } catch (error) {
    next(error);
  }
};

//remove training controller

export const removeTrainingControl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await removeTraining(req.params.id);
    res.send("Successfully removed training!");
  } catch (error) {
    next(error);
  }
};
