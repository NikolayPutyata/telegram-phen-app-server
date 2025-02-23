import { addFriendToUserService } from '../services/webhook.js';
import { bot } from '../utils/initTgBot.js';

export const botController = async (req, res) => {
  await bot.handleUpdate(req.body);

  // Обработка команды /start
  bot.start(async (ctx) => {
    console.log(ctx.message);
    const friendId = ctx.from.id;
    const firstName = ctx.from.first_name;
    const messageText = ctx.message?.text || '';
    const userId = messageText.split(' ')[1];

    await addFriendToUserService(userId, friendId, firstName);
    await ctx.reply('Hello in Phenerium!');
  });

  // Обработка текстовых сообщений (данных от мини-приложения)
  bot.use('text', async (ctx) => {
    console.log('Получен текст:', ctx.message.text);

    const data = JSON.parse(ctx.message.text);
    console.log('Распарсенные данные:', data);

    if (data.action === 'pay' && data.chat_id) {
      console.log('Отправляем счет на chat_id:', data.chat_id);
      await bot.telegram.sendInvoice(data.chat_id, {
        title: data.title,
        description: data.description,
        payload: data.payload,
        provider_token: '',
        currency: 'XTR',
        prices: data.prices,
      });
      console.log('Счет отправлен');
    }
  });

  res.sendStatus(200);
};
