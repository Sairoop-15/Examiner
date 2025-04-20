# ExamPrep AI

A dynamic multiple-choice exam application for interview preparation, built with Node.js and React.js. The application leverages Google's Gemini API to generate customized technical questions based on user-specified topics.

## Features

- **AI-Powered Question Generation**: Create custom exams on any programming topic using Google's Gemini API
- **Interactive Exam Interface**: Take timed exams with a clean, intuitive UI
- **Automated Grading**: Get instant feedback on your performance
- **Detailed Reports**: Review your answers with explanations for each question

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Google Gemini API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3001
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Getting a Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key to your `.env` file

## Usage

1. Enter a technical topic (e.g., "JavaScript Promises", "React Hooks")
2. Specify the number of questions and time per question
3. Take the exam
4. Review your results and explanations

## Technologies Used

- **Frontend**: React.js, Framer Motion, React Router
- **Backend**: Node.js, Express
- **API**: Google Gemini API

## Project Structure

- `/server` - Backend code
  - `/controllers` - Request handlers
  - `/routes` - API routes
  - `/services` - Business logic
- `/src` - Frontend code
  - `/components` - Reusable UI components
  - `/pages` - Page components
  - `/services` - API client

## License

MIT