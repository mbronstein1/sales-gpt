// Path: /api/gpt
import express from 'express';
import { generateFollowUp, generateResponse } from '../controllers/gpt.controller';

const router = express.Router();

router.post('/generate/:companyId', generateResponse);
router.post('/generate/:companyId/:category/follow-up', generateFollowUp);

export default router;
