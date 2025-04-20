import { generateQuestionsFromTopic } from '../services/geminiService.js';

/**
 * Controller to handle question generation requests
 */
export const generateQuestions = async (req, res) => {
  try {
    const { topic, count = 5 } = req.body;
    
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }
    
    console.log(`Generating ${count} questions on topic: ${topic}`);
    
    const questions = await generateQuestionsFromTopic(topic, count);
    
    return res.status(200).json({ questions });
  } catch (error) {
    console.error('Error generating questions:', error);
    
    // Handle specific API errors
    if (error.message.includes('API key')) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
    
    if (error.message.includes('rate limit')) {
      return res.status(429).json({ error: 'API rate limit exceeded, please try again later' });
    }
    
    return res.status(500).json({ 
      error: 'Failed to generate questions',
      message: error.message
    });
  }
};