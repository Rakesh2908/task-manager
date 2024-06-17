// app.js

import express from "express";
import dotenv from "dotenv"; // Import dotenv to load environment variables
import cookieParser from "cookie-parser";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";

const app = express();
dotenv.config({ path: "./config/config.env"}); // Load environment variables

// CORS setup
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
  })
);

// Cookie parser middleware
app.use(cookieParser());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes setup
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

// MongoDB connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
