import { useState } from 'react';
import { motion } from 'framer-motion';

function TopicForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    topic: '',
    questionCount: 5,
    timePerQuestion: 60, // seconds
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.topic.trim()) {
      newErrors.topic = 'Topic is required';
    }
    
    if (formData.questionCount < 1 || formData.questionCount > 20) {
      newErrors.questionCount = 'Question count must be between 1 and 20';
    }
    
    if (formData.timePerQuestion < 15 || formData.timePerQuestion > 300) {
      newErrors.timePerQuestion = 'Time per question must be between 15 and 300 seconds';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        questionCount: Number(formData.questionCount),
        timePerQuestion: Number(formData.timePerQuestion)
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="topic-form">
      <div className="form-group">
        <label htmlFor="topic">Topic:</label>
        <input
          type="text"
          id="topic"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          placeholder="e.g., JavaScript Promises, React Hooks, Data Structures"
          className={errors.topic ? 'input-error' : ''}
        />
        {errors.topic && <div className="error-message">{errors.topic}</div>}
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="questionCount">Number of Questions:</label>
          <input
            type="number"
            id="questionCount"
            name="questionCount"
            min="1"
            max="20"
            value={formData.questionCount}
            onChange={handleChange}
            className={errors.questionCount ? 'input-error' : ''}
          />
          {errors.questionCount && <div className="error-message">{errors.questionCount}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="timePerQuestion">Time per Question (seconds):</label>
          <input
            type="number"
            id="timePerQuestion"
            name="timePerQuestion"
            min="15"
            max="300"
            step="5"
            value={formData.timePerQuestion}
            onChange={handleChange}
            className={errors.timePerQuestion ? 'input-error' : ''}
          />
          {errors.timePerQuestion && <div className="error-message">{errors.timePerQuestion}</div>}
        </div>
      </div>
      
      <motion.button 
        type="submit" 
        className="btn btn-primary btn-large"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Generate Exam
      </motion.button>
    </form>
  );
}

export default TopicForm;

// CSS for TopicForm
const styles = document.createElement('style');
styles.textContent = `
  .topic-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-4);
  }
  
  .topic-form button {
    margin-top: var(--spacing-2);
  }
  
  .input-error {
    border-color: var(--color-error);
  }
  
  .error-message {
    color: var(--color-error);
    font-size: var(--font-size-sm);
    margin-top: var(--spacing-1);
  }
  
  @media (max-width: 600px) {
    .form-row {
      grid-template-columns: 1fr;
    }
  }
`;
document.head.appendChild(styles);