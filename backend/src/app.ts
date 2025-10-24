import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import { setupSwagger } from "./config/swagger";
import imageRoutes from "./routes/imageRoutes";
import { errorHandler } from "./middlewares/errorHandlingMiddleware";

const app = express();
dotenv.config();

// Logging middleware
app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false, //change to true if auth added later
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
setupSwagger(app);

app.use("/api", routes);
app.use("/api", imageRoutes);

//Error handler registery
app.use(errorHandler);

export default app;
