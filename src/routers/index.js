import { Router } from 'express';
import initUserRouter from './user.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.use(
  '/images',
  express.static(path.join(__dirname, 'public/images'), {
    maxAge: '1y',
  }),
);

router.use('/user', initUserRouter);

export default router;
