import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();
const apiKey = 'AIzaSyDcSvbBL4B2PQIO3atWF2TbLOu4kv28hFE';

if (!apiKey) {
  console.warn('Warning: Missing Gemini API key. Please set a valid key in your .env file.');
}

const genAI = new GoogleGenerativeAI(apiKey);


export const generateQuestionsFromTopic = async (topic, count = 5) => {
  try {
    // Validate API key before making request
    if (!apiKey) {
      throw new Error('Invalid Gemini API key. Please set a valid key in your .env file and restart the server. Get a key from: https://aistudio.google.com/app/apikey');
    }
    
    // Get the model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
   
    const prompt = `
    I need you to act as an expert exam question creator for a technical interview preparation app.
    
    Generate ${count} multiple-choice questions about "${topic}" with the following requirements:
    
    1. Each question should be technically accurate and reflect real-world knowledge
    2. Each question must have exactly 4 answer options labeled A, B, C, and D
    3. Only ONE answer should be correct
    4. The incorrect answers should be plausible but clearly wrong to someone who knows the topic well
    5. Include a detailed explanation for the correct answer that teaches the concept
    6. Questions should vary in difficulty (some easy, some medium, some challenging)
    
    Format the response as a valid JSON array with the following structure for each question:
    {
      "question": "The full question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "A", // Must be A, B, C, or D corresponding to the correct option's position
      "explanation": "Detailed explanation of why this answer is correct and the others are not"
    }
    
    Important: Ensure the response is ONLY the valid JSON array with no additional text, markdown, or formatting.
    `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Failed to parse generated questions. Invalid format returned from API.');
    }
    const questions = JSON.parse(jsonMatch[0]);
    
    validateQuestions(questions);
    
    return questions;
  } catch (error) {
    console.error('Error in Gemini API service:', error);
    throw new Error(`Failed to generate questions: ${error.message}`);
  }
};


const validateQuestions = (questions) => {
  if (!Array.isArray(questions)) {
    throw new Error('Generated content is not an array');
  }
  
  questions.forEach((q, index) => {
    if (!q.question || !q.options || !q.correctAnswer || !q.explanation) {
      throw new Error(`Question at index ${index} is missing required fields`);
    }
    
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      throw new Error(`Question at index ${index} must have exactly 4 options`);
    }
    
    if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer)) {
      throw new Error(`Question at index ${index} has an invalid correctAnswer value: ${q.correctAnswer}`);
    }
  });
};