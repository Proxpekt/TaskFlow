import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { Task } from "../models/task.models";
import type { ITask } from "../models/task.models";

const getAllTasks = asyncHandler(async (req: Request, res: Response) => {
    const tasks: ITask[] = await Task.find({ owner: req.user?._id }).sort({
        createdAt: -1,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, tasks, "Tasks fetched successfully!"));
});

const createTask = asyncHandler(async (req: Request, res: Response) => {
    const { title, description } = req.body;

    if (!title?.trim()) {
        throw new ApiError(400, "Title must be present");
    }

    const task: ITask = await Task.create({
        title: title,
        description: description || "",
        owner: req.user?._id,
    });

    if (!task) {
        throw new ApiError(500, "Unable to create task!");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, task, "Task created Successfully!"));
});

const updateTask = asyncHandler(async (req: Request, res: Response) => {
    const { title, description } = req.body;
    if (!title && !description) {
        throw new ApiError(400, "title or description must be present");
    }

    const task: ITask | null = await Task.findOne({
        _id: req.params.id,
        owner: req.user!._id,
    });

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    if (title) task.title = title.trim();
    if (description) task.description = description;

    const updatedTask = await task.save({ validateBeforeSave: false });

    if (!updatedTask) {
        throw new ApiError(500, "Task updataion unsuccessfull!");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedTask, "Task updated successfully!"));
});

const deleteTask = asyncHandler(async (req: Request, res: Response) => {
    const deletedTask = await Task.findOneAndDelete({
        _id: req.params.id,
        owner: req.user!._id,
    });

    if (!deletedTask) {
        throw new ApiError(404, "Task not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Deleted task successfully!"));
});

export { getAllTasks, createTask, updateTask, deleteTask };
