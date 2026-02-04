import { Router } from "express";
import { registerUser, login, logout } from "../controllers/user.controller";
import { verifyJwt } from "../middleware/auth.middleware";

const router: Router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);

// Secure routes
router.route("/logout").post(verifyJwt, logout);
// router.get("/me", getCurrentUser);
// router.patch("/update", updateProfile);

export default router;
