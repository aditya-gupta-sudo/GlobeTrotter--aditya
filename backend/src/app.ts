import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import tripRoutes from "./routes/trip.routes";
import tripStopRouter, {
  tripNestedStopRouter,
} from "./routes/tripStop.routes";
import cityRoutes from "./routes/city.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripNestedStopRouter);
app.use("/api/trips", tripRoutes);
app.use("/api/stops", tripStopRouter);
app.use("/api/cities", cityRoutes);

export default app;