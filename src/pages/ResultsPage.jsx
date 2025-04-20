import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

function ResultsPage({ results, examData }) {
  const [showExplanations, setShowExplanations] = useState(false);
  const navigate = useNavigate();
  
  const correctAnswersCount = results.score;
  const incorrectAnswersCount = results.totalQuestions - correctAnswersCount;
  const scorePercentage = Math.round((correctAnswersCount / results.totalQuestions) * 100);
  
  // Format time (seconds) to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  // Determine if the score is a passing grade (arbitrary: 70%)
  const isPassing = scorePercentage >= 70;
  
  const handleStartNewExam = () => {
    navigate('/');
  };
  
  // Map correctAnswer letter to index
  const getAnswerIndex = (letter) => {
    return ['A', 'B', 'C', 'D'].indexOf(letter);
  };
  
  return (
    <div className="results-page">
      {isPassing && scorePercentage > 80 && <Confetti recycle={false} numberOfPieces={200} />}
      
      <motion.section 
        className="results-summary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <div className="card text-center">
            <h2>Exam Results: {results.topic}</h2>
            
            <div className="score-display">
              <div className={`score-circle ${isPassing ? 'score-passing' : 'score-failing'}`}>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  {scorePercentage}%
                </motion.div>
              </div>
            </div>
            
            <div className="results-stats grid grid-cols-2">
              <div className="stat-item">
                <div className="stat-label">Correct Answers</div>
                <div className="stat-value text-success">{correctAnswersCount}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Incorrect Answers</div>
                <div className="stat-value text-error">{incorrectAnswersCount}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Time Taken</div>
                <div className="stat-value">{formatTime(results.timeTaken)}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Time Allowed</div>
                <div className="stat-value">{formatTime(results.timeAllowed)}</div>
              </div>
            </div>
            
            <div className="results-message">
              {isPassing ? (
                <p className="text-success">
                  Congratulations! You've passed the exam with a score of {scorePercentage}%.
                </p>
              ) : (
                <p className="text-warning">
                  You've completed the exam with a score of {scorePercentage}%. Keep practicing to improve!
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.section>
      
      <motion.section 
        className="results-details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="container">
          <div className="details-header">
            <h3>Question Review</h3>
            <button
              className="btn btn-outline btn-small"
              onClick={() => setShowExplanations(!showExplanations)}
            >
              {showExplanations ? 'Hide Explanations' : 'Show Explanations'}
            </button>
          </div>
          
          <div className="questions-review">
            {examData.questions.map((question, index) => {
              const correctAnswerIndex = getAnswerIndex(question.correctAnswer);
              const userAnswerIndex = results.userAnswers[index];
              const isCorrect = userAnswerIndex === correctAnswerIndex;
              
              return (
                <div key={index} className="question-review-item">
                  <div className="question-review-header">
                    <div className="question-number">Question {index + 1}</div>
                    <div className={`question-result ${isCorrect ? 'result-correct' : 'result-incorrect'}`}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </div>
                  </div>
                  
                  <div className="question-review-content">
                    <p className="question-text">{question.question}</p>
                    
                    <div className="options-review">
                      {question.options.map((option, optIndex) => {
                        let className = 'option-review';
                        if (optIndex === correctAnswerIndex) {
                          className += ' option-correct';
                        } else if (optIndex === userAnswerIndex && !isCorrect) {
                          className += ' option-incorrect';
                        }
                        
                        return (
                          <div key={optIndex} className={className}>
                            <div className="option-label">
                              {['A', 'B', 'C', 'D'][optIndex]}
                            </div>
                            <div className="option-text">{option}</div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {showExplanations && (
                      <div className="explanation">
                        <h4>Explanation:</h4>
                        <p>{question.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="action-buttons">
            <motion.button 
              className="btn btn-primary btn-large"
              onClick={handleStartNewExam}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start New Exam
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default ResultsPage;

// CSS for ResultsPage
const styles = document.createElement('style');
styles.textContent = `
  .results-page {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-8);
  }
  
  .results-summary {
    padding-top: var(--spacing-6);
  }
  
  .score-display {
    display: flex;
    justify-content: center;
    margin: var(--spacing-6) 0;
  }
  
  .score-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-3xl);
    font-weight: 700;
    color: white;
  }
  
  .score-passing {
    background-color: var(--color-success);
  }
  
  .score-failing {
    background-color: var(--color-warning);
  }
  
  .results-stats {
    margin-bottom: var(--spacing-6);
  }
  
  .stat-item {
    padding: var(--spacing-4);
    text-align: center;
  }
  
  .stat-label {
    font-size: var(--font-size-sm);
    color: var(--color-neutral-600);
    margin-bottom: var(--spacing-1);
  }
  
  .stat-value {
    font-size: var(--font-size-xl);
    font-weight: 600;
  }
  
  .results-message {
    font-size: var(--font-size-lg);
    margin-top: var(--spacing-6);
  }
  
  .details-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-4);
  }
  
  .questions-review {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-6);
  }
  
  .question-review-item {
    background-color: var(--color-card-bg);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-md);
  }
  
  .question-review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-3) var(--spacing-6);
    background-color: var(--color-neutral-200);
  }
  
  .question-result {
    font-weight: 600;
    padding: var(--spacing-1) var(--spacing-3);
    border-radius: var(--radius-md);
  }
  
  .result-correct {
    background-color: var(--color-success);
    color: white;
  }
  
  .result-incorrect {
    background-color: var(--color-error);
    color: white;
  }
  
  .question-review-content {
    padding: var(--spacing-6);
  }
  
  .question-text {
    margin-bottom: var(--spacing-4);
    font-weight: 500;
  }
  
  .options-review {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-4);
  }
  
  .option-review {
    display: flex;
    align-items: flex-start;
    padding: var(--spacing-3);
    border: 1px solid var(--color-neutral-300);
    border-radius: var(--radius-md);
  }
  
  .option-correct {
    border-color: var(--color-success);
    background-color: rgba(46, 204, 113, 0.1);
  }
  
  .option-incorrect {
    border-color: var(--color-error);
    background-color: rgba(231, 76, 60, 0.1);
  }
  
  .explanation {
    margin-top: var(--spacing-4);
    padding: var(--spacing-4);
    background-color: var(--color-neutral-100);
    border-radius: var(--radius-md);
    border-left: 4px solid var(--color-primary);
  }
  
  .explanation h4 {
    margin-bottom: var(--spacing-2);
    color: var(--color-primary);
  }
  
  .action-buttons {
    display: flex;
    justify-content: center;
    margin-top: var(--spacing-8);
  }
  
  @media (max-width: 768px) {
    .results-stats {
      grid-template-columns: 1fr;
    }
  }
`;
document.head.appendChild(styles);