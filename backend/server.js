import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/task.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5175",
      "https://ethara-rbbkbbgcn-nihith-aithas-projects.vercel.app",
      "https://ethara-eeqqm9no9-nihith-aithas-projects.vercel.app"
    ],
    credentials: true
  })
);

/*app.use(
  cors({
    origin: "https://ethara-eeqqm9no9-nihith-aithas-projects.vercel.app",
    credentials: true,
  })
);*/

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running");
    });
  })
  .catch((err) => {
    console.log(err);
  });