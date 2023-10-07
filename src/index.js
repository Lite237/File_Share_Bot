import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import dotenv from "dotenv";

import {
    start,
    handleError,
    Done,
    addVideo,
    addDocument,
} from "./commands/index.js";
import { development, production } from "./core/index.js";
import prisma from "./config/prisma.js";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const ENVIRONMENT = process.env.NODE_ENV || "";

const bot = new Telegraf(BOT_TOKEN);

bot.start(start);

bot.on(message("text"), Done);

bot.on(message("document"), addDocument);

bot.on(message("video"), addVideo);

bot.catch(handleError);

export const startVercel = async (req, res) => {
    await production(req, res, bot);
};

//dev mode

ENVIRONMENT !== "production" && development(bot);
