import express from "express";

const app = express();
const PORT = 3000;

app.use("/", (res, req, next) => {
  console.log("hello");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
