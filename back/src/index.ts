import express, { NextFunction, Request, Response } from "express";
import userRoutes from "./routes/user";
import mailRoutes from "./routes/mail";
import cors from "cors";
const app = express();

//middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:8080" }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to fitnes center API!");
});

//routes

app.use("/user", userRoutes);
app.use("mail", mailRoutes);

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
