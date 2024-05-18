// Path: /api/gpt
import express from 'express';
import { generateFollowUp, generateResponse } from '../controllers/gpt.controller';

const router = express.Router();

router.get('/generate', generateResponse);
router.get('/generate/follow-up', generateFollowUp);

export default router;
