import { Router } from "express";
import { createUser,verifyEmail,forgotPassword,resetPassword,checkToken,loginUser,refreshToken} from "../controllers/users/index.js";

const router = Router();

router.post("/login", loginUser);
router.post("/signup", createUser);
router.get("/verify_email/:id/:token", verifyEmail);
router.post("/forgot_password", forgotPassword);
router.post("/reset_password/:id/:token", resetPassword);
router.post("/check_token/:id/:token", checkToken);
router.post("/refresh_token", refreshToken);
export default router;
