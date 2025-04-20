import { motion } from 'framer-motion';

function QuestionCard({ question, questionNumber, selectedAnswer, onSelectAnswer }) {
  const handleOptionClick = (index) => {
    onSelectAnswer(index);
  };
  
  // Map correctAnswer letter to index
  const optionLabels = ['A', 'B', 'C', 'D'];
  
  return (
    <div className="question-card">
      <div className="question-header">
        <div className="question-number">Question {questionNumber}</div>
      </div>
      
      <div className="question-content">
        <h3>{question.question}</h3>
        
        <div className="options-list">
          {question.options.map((option, index) => (
            <motion.div
              key={index}
              className={`option ${selectedAnswer === index ? 'option-selected' : ''}`}
              onClick={() => handleOptionClick(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="option-label">{optionLabels[index]}</div>
              <div className="option-text">{option}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;

// CSS for QuestionCard
const styles = document.createElement('style');
styles.textContent = `
  .question-card {
    background-color: var(--color-card-bg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }
  
  .question-header {
    background-color: var(--color-primary);
    color: white;
    padding: var(--spacing-3) var(--spacing-6);
  }
  
  .question-number {
    font-weight: 600;
    font-size: var(--font-size-lg);
  }
  
  .question-content {
    padding: var(--spacing-6);
  }
  
  .question-content h3 {
    margin-bottom: var(--spacing-6);
    line-height: 1.4;
  }
  
  .options-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
  }
  
  .option {
    display: flex;
    align-items: flex-start;
    padding: var(--spacing-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  
  .option:hover {
    border-color: var(--color-primary);
    background-color: var(--color-neutral-50);
  }
  
  .option-selected {
    border-color: var(--color-primary);
    background-color: var(--color-primary-light);
    color: white;
  }
  
  .option-label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: var(--color-neutral-200);
    color: var(--color-neutral-700);
    border-radius: 50%;
    font-weight: 600;
    margin-right: var(--spacing-3);
    flex-shrink: 0;
  }
  
  .option-selected .option-label {
    background-color: white;
    color: var(--color-primary);
  }
  
  .option-text {
    flex: 1;
  }
`;
document.head.appendChild(styles);