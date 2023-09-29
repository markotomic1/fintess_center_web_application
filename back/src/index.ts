import express, { NextFunction, Request, Response } from "express";
import userRoutes from "./routes/user";
const app = express();

//middlewares
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to fitnes center API!");
});

//routes

app.use("/user", userRoutes);

//error middleware

app.use(
  (
    error: { statusCode: number; message: string },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const statusCode = error.statusCode || 500;

    console.log(error);
    res.status(statusCode).send(error.message);
  }
);

//expres server

app.listen(process.env.PORT || 3000, () => {
  console.log("App is listening on port " + process.env.PORT);
});
