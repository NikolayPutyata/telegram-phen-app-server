import { addFriendToUserService } from '../services/webhook.js';
import { bot } from '../utils/initTgBot.js';

bot.start(async (ctx) => {
  const friendId = ctx.from.id;
  const firstName = ctx.from.first_name;
  const messageText = ctx.message?.text || '';
  const userId = messageText.split(' ')[1];

  await addFriendToUserService(userId, friendId, firstName);
  await ctx.reply('Hello in Phenerium!');
});

bot.on('pre_checkout_query', async (ctx) => {
  await ctx.answerPreCheckoutQuery(true);
});

bot.on('successful_payment', async (ctx) => {
  await ctx.reply(
    `Спасибо за покупку "${ctx.message.successful_payment.invoice_payload}"!`,
  );
});

export const botController = async (req, res) => {
  await bot.handleUpdate(req.body);
  res.sendStatus(200);
};
