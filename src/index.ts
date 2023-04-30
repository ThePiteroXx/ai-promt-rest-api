import express from "express";

import { promptRoute } from "./routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/prompt", promptRoute);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
