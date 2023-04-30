import express from "express";

import { getAllPrompts, getPrompt } from "../controllers/prompt";

const routes = express.Router();

routes.get("/getAll", getAllPrompts);
routes.get("/get", getPrompt);

export default routes;
