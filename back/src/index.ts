import express, { Request, Response } from "express";
import userRoutes from "./routes/user";
const app = express();

//middlewares
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("hello again 2");
});

//routes

app.use("/user", userRoutes);

app.listen(3000, () => {
  console.log("app is listening");
});
