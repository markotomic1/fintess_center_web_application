import { dayType } from "../utils/types";
import { prisma } from "../database/database";
import { CustomError } from "../utils/customError";

//add a training

export const addTraining = async (name: string, time: string, day: dayType) => {
  try {
    const training = await prisma.training.create({
      data: { trainingName: name, trainingTime: time, trainingDay: day },
    });
    return training;
  } catch (error) {
    console.log(error);
    throw new CustomError("Unable to add training!", 400);
  }
};

//get all trainings

export const getTrainings = async () => {
  try {
    const trainings = await prisma.training.findMany();

    return trainings;
  } catch (error) {
    throw new CustomError("Unable to get trainings!", 400);
  }
};

//remove training
export const removeTraining = async (trainingId: string) => {
  try {
    await prisma.training.delete({ where: { id: trainingId } });
  } catch (error) {
    throw new CustomError("Unable to delete training!", 400);
  }
};
