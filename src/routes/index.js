import { Router } from "express";
import auth from "./auth.js";
const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
    }
);

router.use("/api/auth", auth);
router.use("/api/cookies", (req, res) => {
    console.log("req: ", req);
    res.cookie("name", "express").send("cookie set"); //Sets name = express
    }
);

export default router;