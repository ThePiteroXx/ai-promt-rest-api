import axios from "axios";
import * as dotenv from "dotenv";
import { RequestHandler } from "express";
import Cache from "node-cache";

type ResponseKey =
  | "id"
  | "smallImage"
  | "bigImage"
  | "prompt"
  | "prompt_full"
  | "created_at"
  | "score"
  | "time"
  | "aspect";

type Response = Record<ResponseKey, string>;

type Params = {
  search: string | undefined;
  page: number | undefined;
};

const promptCache = new Cache({ stdTTL: 60 * 15 });

dotenv.config();

const headers = {
  "X-RapidAPI-Key": process.env.KEY,
  "X-RapidAPI-Host": process.env.HOST,
};

export const getAllPrompts: RequestHandler = async (req, res, next) => {
  const { page } = req.query as Params;
  let data: Response[] = [];

  //cache check
  if (promptCache.has("prompt-list")) {
    data = promptCache.get("prompt-list") as Response[];
  } else {
    const { data: promptData } = await axios.get(
      "https://ai_image-database.p.rapidapi.com/images/midjourney",
      { headers }
    );

    data = promptData;
    promptCache.set("prompt-list", data);
  }

  let limit = 20;
  let paginatedPrompts = [];

  if (page) {
    paginatedPrompts = data.slice((page - 1) * limit, page * limit);
  } else {
    paginatedPrompts = data;
  }

  return res.status(200).json(paginatedPrompts);
};

export const getPrompt: RequestHandler = async (req, res, next) => {
  const { search } = req.query as Params;
  let data: Response[] = [];

  if (!search)
    return res
      .status(400)
      .json({ message: "Something gone wrong. Please try later." });

  // cache check
  if (promptCache.has("prompt-list")) {
    data = promptCache.get("prompt-list") as Response[];
  } else {
    const { data: promptData } = await axios.get(
      "https://ai_image-database.p.rapidapi.com/images/midjourney",
      { headers }
    );

    data = promptData;
    promptCache.set("prompt-list", data);
  }

  const searchedPrompts = data.filter((item: Response) =>
    item.prompt?.includes(search)
  );

  return res.status(200).json(searchedPrompts);
};
