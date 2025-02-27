import { Router } from 'express';
import { getAllBoostsController } from '../controllers/data.js';

const router = Router();

router.get('/getAllBoosts', getAllBoostsController);

export default router;
