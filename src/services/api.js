import axios from 'axios';

// Base URL for API
const API_URL = 'https://examiner-1.onrender.com';

/**
 * Generate questions based on a topic using the backend API
 * @param {string} topic - Topic for the questions
 * @param {number} count - Number of questions to generate
 * @returns {Promise<Array>} - Array of questions
 */
export const generateQuestions = async (topic, count = 5) => {
  try {
    const response = await axios.post(`${API_URL}/generate-questions`, {
      topic,
      count
    });
    
    return response.data;
  } catch (error) {
    console.error('Error generating questions:', error);
    
    // Extract error message from API response if available
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        'Failed to generate questions. Please try again.';
    
    throw new Error(errorMessage);
  }
};