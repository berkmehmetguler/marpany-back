import { Router } from "express";
import { getForDashboard } from "../controllers/ads/banner/index.js";
import { verifyAccessToken } from "../middleware/jwt.js";

const router = Router();

router.get("/edit/:ads_id/:user_id", verifyAccessToken, getForDashboard);

export default router;
