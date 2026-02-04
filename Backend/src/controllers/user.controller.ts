import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { IUser, User } from "../models/user.models";
import { OPTIONS } from "../constants";

const generateAccessAndRefreshToken = async (user: IUser) => {
    try {
        const accessToken: string = user.generateAccessToken();
        const refreshToken: string = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating refresh and access token!"
        );
    }
};

const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, fullname, password } = req.body;

    if (
        [username, email, fullname, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required!");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        throw new ApiError(409, "username or email exists already!");
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullname,
        password,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user!"
        );
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, createdUser, "User Registered Successfully!")
        );
});

const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and Password must be present!");
    }

    const user: IUser | null = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User doesn't exist!");
    }

    const isValid = await user.isPasswordCorrect(password);

    if (!isValid) {
        throw new ApiError(401, "Invalid Credintials");
    }

    const { accessToken, refreshToken } =
        await generateAccessAndRefreshToken(user);

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res
        .status(200)
        .cookie("accessToken", accessToken, OPTIONS)
        .cookie("refreshToken", refreshToken, OPTIONS)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in Successfully!"
            )
        );
});

const logout = asyncHandler(async (req: Request, res: Response) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        { new: true }
    );

    return res
    .status(200)
    .clearCookie("accessToken", OPTIONS)
    .clearCookie("refreshToken", OPTIONS)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully!"));
});

// const getCurrentUser = asyncHandler(async (req:Request, res:Response) => {})

// const updateUser = asyncHandler(async (req:Request, res:Response) => {})

// const refreshAccessToken = asyncHandler(async (req:Request, res:Response) => {})

export { registerUser, login, logout };
