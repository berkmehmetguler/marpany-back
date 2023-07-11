import { Router } from "express";
import { createUser,verifyEmail } from "../controllers/users/index.js";

const router = Router();

router.post("/signup", createUser);
router.get("/verify_email/:id/:token", verifyEmail);
export default router;
