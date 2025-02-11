import { env } from './env.js';
import { Telegraf } from 'telegraf';

export const bot = new Telegraf(env('TELEGRAM_BOT_TOKEN'));

export const initTgBot = async () => {
  await bot.telegram.setWebhook(
    'https://telegram-phen-app-server-scjhs.ondigitalocean.app/webhook/bot',
  );
};
