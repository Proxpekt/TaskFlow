import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler";
import { User } from "../models/user.models";
import ApiError from "../utils/ApiError";
import type { Request, Response, NextFunction } from "express";
import type { AccessTokenPayload } from "../types/auth";

export const verifyJwt = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const token: string =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized Request");
        }

        const decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as string
        ) as AccessTokenPayload;

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            throw new ApiError(401, "Invalid Access Token!");
        }

        req.user = user;

        next();
    }
);
