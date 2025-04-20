import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Timer from '../components/Timer';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';

function ExamPage({ examData, onCompleteExam }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    Array(examData.questions.length).fill(null)
  );
  const [timeRemaining, setTimeRemaining] = useState(
    examData.timePerQuestion * examData.questions.length
  );
  const [isFinished, setIsFinished] = useState(false);
  
  const navigate = useNavigate();
  const timerRef = useRef(null);
  
  const currentQuestion = examData.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === examData.questions.length - 1;
  
  // Start timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timerRef.current);
  }, []);
  
  const selectAnswer = (optionIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };
  
  const goToNextQuestion = () => {
    if (isLastQuestion) {
      finishExam();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const finishExam = () => {
    clearInterval(timerRef.current);
    setIsFinished(true);
    
    // Calculate results
    const endTime = new Date();
    const timeTaken = Math.floor((endTime - examData.startTime) / 1000);
    
    const results = {
      topic: examData.topic,
      totalQuestions: examData.questions.length,
      userAnswers: userAnswers,
      timeTaken: timeTaken,
      timeAllowed: examData.timePerQuestion * examData.questions.length,
      score: calculateScore(userAnswers, examData.questions)
    };
    
    onCompleteExam(results);
    navigate('/results');
  };
  
  const calculateScore = (answers, questions) => {
    return answers.reduce((score, answer, index) => {
      if (answer === null) return score;
      
      const correctAnswerIndex = ['A', 'B', 'C', 'D'].indexOf(
        questions[index].correctAnswer
      );
      
      return answer === correctAnswerIndex ? score + 1 : score;
    }, 0);
  };
  
  return (
    <div className="exam-page">
      <div className="exam-header">
        <div className="container">
          <h2>{examData.topic} Exam</h2>
          <div className="exam-controls">
            <ProgressBar 
              current={currentQuestionIndex + 1} 
              total={examData.questions.length} 
            />
            <Timer 
              seconds={timeRemaining} 
              onTimeUp={finishExam}
              warningThreshold={60} // 1 minute warning
            />
          </div>
        </div>
      </div>
      
      <div className="container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="question-container"
          >
            <QuestionCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              selectedAnswer={userAnswers[currentQuestionIndex]}
              onSelectAnswer={selectAnswer}
            />
            
            <div className="navigation-buttons">
              <motion.button
                className="btn btn-primary"
                onClick={goToNextQuestion}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLastQuestion ? 'Finish Exam' : 'Next Question'}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ExamPage;

// CSS for ExamPage
const styles = document.createElement('style');
styles.textContent = `
  .exam-page {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-6);
  }
  
  .exam-header {
    background-color: var(--color-card-bg);
    padding: var(--spacing-4) 0;
    box-shadow: var(--shadow-sm);
  }
  
  .exam-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-4);
    margin-top: var(--spacing-4);
  }
  
  .question-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-6);
  }
  
  .navigation-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: var(--spacing-4);
  }
  
  @media (max-width: 768px) {
    .exam-controls {
      flex-direction: column;
      align-items: stretch;
    }
  }
`;
document.head.appendChild(styles);