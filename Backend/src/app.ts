import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { LIMIT } from "./constants";
// Import Routes
import userRouter from "./routes/user.route";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(
    express.json({
        limit: LIMIT,
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: LIMIT,
    })
);

app.use(cookieParser());

// Declaring routes
app.use("/api/v1/users", userRouter);

export default app;
