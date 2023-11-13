import { NextFunction, Request, Response } from "express";
import { addNews, deleteNews, getNews } from "../services/newsService";

//add news Controller
export const addNewsControl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const description = req.body.newsDescription;
    const news = await addNews(description);
    res.send(news);
  } catch (error) {
    next(error);
  }
};

//get all news

export const getNewsControl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const news = await getNews();
    res.send(news);
  } catch (error) {
    next(error);
  }
};

//remove news
export const deleteNewsControl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteNews(req.params.id);

    res.send("Successfully deleted news");
  } catch (error) {
    next(error);
  }
};
