import { Router } from "express";
import { createCampaign } from "../controllers/campaign/index.js";
import { verifyAccessToken } from "../middleware/jwt.js";
const router = Router();

router.post("/create", verifyAccessToken, createCampaign);

export default router;
