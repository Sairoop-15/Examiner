import express from 'express';
import { generateQuestions } from '../controllers/questionController.js';

const router = express.Router();

// POST endpoint to generate questions based on a topic
router.post('/generate-questions', generateQuestions);

export default router;