import express from "express";
import cors from "cors";

import { promptRoute } from "./routes";

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.use("/prompt", promptRoute);

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${PORT} or http://0.0.0.0:${PORT}`
  );
});
