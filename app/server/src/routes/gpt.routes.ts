// Path: /api/gpt
import express from 'express';
import { generateFollowUp, generateResponse } from '../controllers/gpt.controller';

const router = express.Router();

router.get('/generate/:companyId', generateResponse);
router.get('/generate/:companyId/:category/follow-up', generateFollowUp);

export default router;
