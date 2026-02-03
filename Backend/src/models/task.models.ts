import mongoose, { Schema } from "mongoose";
import type { Document, Model } from "mongoose";

export interface ITask extends Document {
    title: string;
    description: string;
    completed: boolean;
    owner: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export const Task: Model<ITask> = mongoose.model<ITask>("Task", taskSchema);
