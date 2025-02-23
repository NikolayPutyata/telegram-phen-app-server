import { addFriendToUserService } from '../services/webhook.js';
import { bot } from '../utils/initTgBot.js';

export const botController = async (req, res) => {
  await bot.handleUpdate(req.body);
  res.sendStatus(200);
};

// Обработка команды /start
bot.start(async (ctx) => {
  const friendId = ctx.from.id;
  const firstName = ctx.from.first_name;
  const messageText = ctx.message?.text || '';
  const userId = messageText.split(' ')[1];

  await addFriendToUserService(userId, friendId, firstName);
  await ctx.reply('Hello in Phenerium!');
});

// Обработка текстовых сообщений (данных от мини-приложения)
bot.on('text', async (ctx) => {
  try {
    const data = JSON.parse(ctx.message.text); // Парсим JSON от tg.sendData
    console.log('Получены данные от мини-приложения:', data);

    if (data.action === 'pay') {
      // Отправляем счет пользователю
      await ctx.replyWithInvoice({
        chat_id: ctx.chat.id,
        title: data.title,
        description: data.description,
        payload: data.payload, // Уникальный идентификатор заказа
        provider_token: '', // Для Stars оставляем пустым
        currency: 'XTR', // Валюта Telegram Stars
        prices: data.prices, // [{ label: 'Price', amount: 100 }]
      });
    }
  } catch (error) {
    console.error('Ошибка обработки данных:', error);
    await ctx.reply('Произошла ошибка при обработке вашего запроса.');
  }
});

// Обработка предпроверки оплаты
bot.on('pre_checkout_query', async (ctx) => {
  try {
    console.log('Предпроверка оплаты:', ctx.preCheckoutQuery);
    await ctx.answerPreCheckoutQuery(true); // Подтверждаем оплату
  } catch (error) {
    console.error('Ошибка предпроверки:', error);
    await ctx.answerPreCheckoutQuery(false, 'Ошибка при проверке оплаты');
  }
});

// Обработка успешной оплаты
bot.on('successful_payment', async (ctx) => {
  const payment = ctx.message.successful_payment;
  console.log('Успешная оплата:', payment);
  await ctx.reply(`Спасибо за покупку "${payment.invoice_payload}"!`);
});
