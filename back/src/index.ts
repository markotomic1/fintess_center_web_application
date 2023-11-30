import express, { NextFunction, Request, Response } from "express";
import userRoutes from "./routes/user";
import mailRoutes from "./routes/mail";
import trainingRoutes from "./routes/training";
import newsRoutes from "./routes/news";
import planRoutes from "./routes/plan";
import paymentRoutes from "./routes/payment";
import cors from "cors";
import winston from "winston";
import "dotenv/config";
const app = express();

//winston logger setup
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({ format: winston.format.simple() })
  );
}

//middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:8080", credentials: true }));
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.log({
    level: "info",
    message: "Request recieved!",
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
  });
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to fitnes center API!");
});

//routes

app.use("/user", userRoutes);
app.use("/mail", mailRoutes);
app.use("/training", trainingRoutes);
app.use("/news", newsRoutes);
app.use("/plan", planRoutes);
app.use("/payment", paymentRoutes);

//error middleware

app.use(
  (
    error: { statusCode: number; message: string },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const statusCode = error.statusCode || 500;
    logger.error(error.message);
    res.status(statusCode).send(error.message);
  }
);

//expres server

app.listen(process.env.PORT || 3000, () => {
  console.log("App is listening on port " + process.env.PORT);
});
