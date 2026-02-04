import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { LIMIT } from "./constants";
// Import Routes
import userRouter from "./routes/users.route";
import taskRouter from "./routes/tasks.route";
import type { Request, Response, NextFunction } from "express";

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
app.use("/api/v1/tasks", taskRouter);

// Unknown Routes
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        data: {},
        message: "Route not found",
    });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
    });
});

export default app;
