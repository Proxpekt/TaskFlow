import { Router } from "express";
import {
    createTask,
    deleteTask,
    getAllTasks,
    toggleTaskCompletion,
    updateTask,
} from "../controllers/task.controller";
import { verifyJwt } from "../middleware/auth.middleware";

const router = Router();

// All routes are secure
router.use(verifyJwt);

// Routes
router.route("/").get(getAllTasks);
router.route("/").post(createTask);
router.route("/:id").patch(updateTask);
router.route("/:id").delete(deleteTask);
router.route("/:id/toggle").patch(toggleTaskCompletion);

export default router;
