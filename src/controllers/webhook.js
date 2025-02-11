import { bot } from '../utils/initTgBot.js';

export const botController = async (req, res) => {
  await bot.handleUpdate(req.body);
  res.sendStatus(200);
};

// Обработчики команд
bot.start((ctx) => {
  const messageText = ctx.message?.text || '';
  const refCode = messageText.split(' ')[1]; // Берём всё после "/start"

  ctx.reply(refCode ? `Твой рефкод: ${refCode}` : 'Привет! Без рефкода.');
});
