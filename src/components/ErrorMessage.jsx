import { motion } from 'framer-motion';

function ErrorMessage({ message }) {
  return (
    <motion.div 
      className="error-container"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="error-icon">!</div>
      <p>{message}</p>
    </motion.div>
  );
}

export default ErrorMessage;

// CSS for ErrorMessage
const styles = document.createElement('style');
styles.textContent = `
  .error-container {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    background-color: var(--color-error);
    color: white;
    padding: var(--spacing-3) var(--spacing-4);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-4);
  }
  
  .error-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background-color: white;
    color: var(--color-error);
    border-radius: 50%;
    font-weight: bold;
  }
  
  .error-container p {
    margin: 0;
  }
`;
document.head.appendChild(styles);