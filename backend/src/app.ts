import express from "express";
import cors from "cors";
import routes from "./routes";
import { setupSwagger } from "./config/swagger";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

setupSwagger(app);

app.use("/api", routes);

export default app;
