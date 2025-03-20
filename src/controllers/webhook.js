import { successPaymentService } from '../services/payments.js';
import { addFriendToUserService } from '../services/webhook.js';
import { bot } from '../utils/initTgBot.js';

bot.start(async (ctx) => {
  const friendId = ctx.from.id;
  const firstName = ctx.from.first_name;
  const messageText = ctx.message?.text || '';
  const userId = messageText.split(' ')[1];
  const tgRefCode = userId.split('_')[2];

  if (userId.split('_')[1] === 'mup') {
    await addFriendToUserService({ friendId, firstName, tgRefCode });
  } else {
    await addFriendToUserService({
      userId: Number(userId),
      friendId,
      firstName,
    });
  }

  await ctx.reply(
    `Welcome to Phenerium, ${firstName}! 🚀\n\n` +
      `Dive into an exciting world of token farming! Boost your progress with powerful upgrades, invite friends to earn bonuses, and join exclusive presales and airdrops.\n\n Ready to get started?\n Tap the button below and jump into the adventure!`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Open App',
              url: 'https://telegram-phen-app.vercel.app/',
            },
          ],
        ],
      },
    },
  );
});

bot.on('pre_checkout_query', async (ctx) => {
  await ctx.answerPreCheckoutQuery(true);
});

bot.on('successful_payment', async (ctx) => {
  await successPaymentService(ctx.message.successful_payment.invoice_payload);
});

export const botController = async (req, res) => {
  await bot.handleUpdate(req.body);
  res.sendStatus(200);
};
