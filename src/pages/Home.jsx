import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TopicForm from '../components/TopicForm';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import { generateQuestions } from '../services/api';

function Home({ onStartExam }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await generateQuestions(formData.topic, formData.questionCount);
      
      if (data.questions && data.questions.length > 0) {
        onStartExam({
          topic: formData.topic,
          questions: data.questions,
          timePerQuestion: formData.timePerQuestion
        });
        navigate('/exam');
      } else {
        setError('No questions were generated. Please try a different topic.');
      }
    } catch (err) {
      setError(err.message || 'Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <motion.section 
        className="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container text-center">
          <h1>Prepare for Technical Interviews</h1>
          <p className="lead">Generate custom exam questions on any programming topic using AI</p>
        </div>
      </motion.section>

      <motion.section 
        className="topic-form-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="container">
          <div className="card">
            <h2>Generate an Exam</h2>
            {error && <ErrorMessage message={error} />}
            {loading ? (
              <LoadingIndicator message="Generating questions..." />
            ) : (
              <TopicForm onSubmit={handleSubmit} />
            )}
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="features"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="container">
          <h2 className="text-center mb-6">Features</h2>
          <div className="grid grid-cols-3">
            <div className="feature-card">
              <h3>AI-Generated Questions</h3>
              <p>Create custom questions on any programming topic using the power of Gemini AI</p>
            </div>
            <div className="feature-card">
              <h3>Time-Based Exams</h3>
              <p>Test your knowledge under time constraints to simulate real interview pressure</p>
            </div>
            <div className="feature-card">
              <h3>Detailed Explanations</h3>
              <p>Learn from your mistakes with comprehensive explanations for each question</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Home;

// CSS for Home
const styles = document.createElement('style');
styles.textContent = `
  .home-page {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-8);
  }
  
  .hero {
    padding: var(--spacing-8) 0;
  }
  
  .hero h1 {
    margin-bottom: var(--spacing-4);
    font-size: var(--font-size-4xl);
  }
  
  .lead {
    font-size: var(--font-size-xl);
    color: var(--color-neutral-600);
    max-width: 800px;
    margin: 0 auto;
  }
  
  .topic-form-section .card {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .features {
    padding: var(--spacing-8) 0;
  }
  
  .feature-card {
    padding: var(--spacing-6);
    background-color: var(--color-card-bg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    transition: transform var(--transition-normal);
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: 768px) {
    .hero h1 {
      font-size: var(--font-size-3xl);
    }
    
    .lead {
      font-size: var(--font-size-lg);
    }
  }
`;
document.head.appendChild(styles);