import { initMongoDB } from './db/initMongoDB.js';
import { setupServer } from './server.js';
import { initTgBot } from './utils/initTgBot.js';

const bootstrap = async () => {
  await initMongoDB();
  await initTgBot();

  setupServer();
};

bootstrap();
