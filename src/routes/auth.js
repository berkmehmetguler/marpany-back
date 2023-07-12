import { Router } from "express";
import { createUser,verifyEmail,forgotPassword,resetPassword,checkToken} from "../controllers/users/index.js";

const router = Router();

router.post("/signup", createUser);
router.get("/verify_email/:id/:token", verifyEmail);
router.post("/forgot_password", forgotPassword);
router.post("/reset_password/:id/:token", resetPassword);
router.post("/check_token/:id/:token", checkToken);
export default router;
