import { router } from "@shared/routes/index";
import dotenv from "dotenv";

import express from "express";

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server online!, Listening on port " + process.env.PORT || 5000);
});
