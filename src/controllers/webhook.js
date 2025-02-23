import { addFriendToUserService } from '../services/webhook.js';
import { bot } from '../utils/initTgBot.js';

// Обработка команды /start
bot.start(async (ctx) => {
  console.log('Команда /start:', ctx.message);
  const friendId = ctx.from.id;
  const firstName = ctx.from.first_name;
  const messageText = ctx.message?.text || '';
  const userId = messageText.split(' ')[1];

  await addFriendToUserService(userId, friendId, firstName);
  await ctx.reply('Hello in Phenerium!');
});

bot.on('callback_query', async (ctx) => {
  try {
    const data = JSON.parse(ctx.callbackQuery.data); // Получаем данные от Mini App
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
    } else {
      console.log("Нет chat_id или action !== 'pay'");
    }
  } catch (error) {
    console.error('Ошибка обработки данных:', error);
  }
});

// Обработка предпроверки оплаты
bot.on('pre_checkout_query', async (ctx) => {
  console.log('Предпроверка оплаты:', ctx.preCheckoutQuery);
  try {
    await ctx.answerPreCheckoutQuery(true);
  } catch (error) {
    console.error('Ошибка предпроверки:', error.message);
    await ctx.answerPreCheckoutQuery(false, 'Ошибка при проверке оплаты');
  }
});

// Обработка успешной оплаты
bot.on('successful_payment', async (ctx) => {
  console.log('Успешная оплата:', ctx.message.successful_payment);
  await ctx.reply(
    `Спасибо за покупку "${ctx.message.successful_payment.invoice_payload}"!`,
  );
});

// Контроллер вебхука
export const botController = async (req, res) => {
  console.log('Получен запрос от Telegram:', req.body); // Лог всех обновлений
  await bot.handleUpdate(req.body);
  res.sendStatus(200);
};
