import axios from "axios";
import * as dotenv from "dotenv";
import { RequestHandler } from "express";

dotenv.config();

type Params = {
  search: string | undefined;
};

const headers = {
  "X-RapidAPI-Key": process.env.KEY,
  "X-RapidAPI-Host": process.env.HOST,
};

export const getAllPrompts: RequestHandler = async (req, res, next) => {
  const data = await axios.get(
    "https://ai_image-database.p.rapidapi.com/images/midjourney",
    { headers }
  );
  console.log(data.data);
  return res.status(200).json(data.data);
};

export const getPrompt: RequestHandler = async (req, res, next) => {
  const { search } = req.query as Params;
  if (!search)
    return res
      .status(400)
      .json({ message: "Something gone wrong. Please try later." });

  const response = await axios.get(
    "https://ai_image-database.p.rapidapi.com/images/midjourney",
    { headers }
  );

  let limit = 10;
  const arr: { prompt: string }[] = [];

  response.data.some((item: { prompt: string }) => {
    if (item.prompt?.includes(search)) arr.push(item);
    if (arr.length === limit) return true;
  });

  return res.status(200).json(arr);
};
