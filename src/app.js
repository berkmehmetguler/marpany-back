import express from "express";
import "dotenv/config";
import cors from "cors";
import "./clients/mongo.js";
import router from "./routes/index.js";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use("/public", express.static(__dirname + "/public"));
app.use((err, req, res, next) => {
  console.log(err);

  if (err) {
    if (err.output) {
      return res.status(err.output.statusCode || 500).json(err.output.payload);
    }
    return res.status(500).json(err);
  }
});

app.listen(process.env.PORT || 5001, () => {
  console.log(`Example app listen`);
});
