import axios from 'axios';
import { API_URL } from '../config';

// Base URL for API
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