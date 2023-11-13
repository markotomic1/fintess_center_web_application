import { prisma } from "../database/database";
import { CustomError } from "../utils/customError";

//add news

export const addNews = async (newsDescription: string) => {
  try {
    const news = await prisma.news.create({ data: { newsDescription } });

    return news;
  } catch (error) {
    console.error(error);
    throw new CustomError("Unable to create news!", 400);
  }
};
//get all news

export const getNews = async () => {
  try {
    const news = await prisma.news.findMany();

    return news;
  } catch (error) {
    console.error(error);
    throw new CustomError("Unable to get news!", 500);
  }
};

//delete news

export const deleteNews = async (newsId: string) => {
  try {
    await prisma.news.delete({ where: { id: newsId } });
  } catch (error) {
    console.error(error);
    throw new CustomError("Unable to delete news!", 400);
  }
};
