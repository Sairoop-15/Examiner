import { motion } from 'framer-motion';

function ProgressBar({ current, total }) {
  const progress = (current / total) * 100;
  
  return (
    <div className="progress-container">
      <div className="progress-text">
        Question {current} of {total}
      </div>
      <div className="progress-bar-container">
        <motion.div 
          className="progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;

// CSS for ProgressBar
const styles = document.createElement('style');
styles.textContent = `
  .progress-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    width: 100%;
    max-width: 400px;
  }
  
  .progress-text {
    font-size: var(--font-size-sm);
    font-weight: 500;
  }
  
  .progress-bar-container {
    height: 8px;
    background-color: var(--color-neutral-200);
    border-radius: var(--radius-full);
    overflow: hidden;
  }
  
  .progress-bar {
    height: 100%;
    background-color: var(--color-primary);
    border-radius: var(--radius-full);
  }
`;
document.head.appendChild(styles);