import { addFriendToUserService } from '../services/webhook.js';
import { bot } from '../utils/initTgBot.js';

export const botController = async (req, res) => {
  await bot.handleUpdate(req.body);
  res.sendStatus(200);
};

bot.start(async (ctx) => {
  const friendId = ctx.from.id;
  const firstName = ctx.from.first_name;
  const messageText = ctx.message?.text || '';
  const userId = messageText.split(' ')[1]; // Берём всё после "/start"

  await addFriendToUserService(userId, friendId, firstName);

  ctx.reply('Hello in Phenerium!');
});
