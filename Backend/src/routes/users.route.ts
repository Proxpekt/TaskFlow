import { Router } from "express";
import { registerUser, login, logout, getCurrentUser } from "../controllers/user.controller";
import { verifyJwt } from "../middleware/auth.middleware";

const router: Router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);

// Secure routes
router.route("/logout").post(verifyJwt, logout);
router.route("/me").get(verifyJwt, getCurrentUser);
// router.patch("/update", updateProfile);

export default router;
