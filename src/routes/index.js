import { Router } from "express";
import auth from "./auth.js";
const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
    }
);

router.use("/api/auth", auth);

export default router;