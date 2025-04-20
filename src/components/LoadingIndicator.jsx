import { motion } from 'framer-motion';

function LoadingIndicator({ message = 'Loading...' }) {
  return (
    <div className="loading-container">
      <motion.div 
        className="loading-spinner"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p>{message}</p>
    </div>
  );
}

export default LoadingIndicator;

// CSS for LoadingIndicator
const styles = document.createElement('style');
styles.textContent = `
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-8) 0;
    gap: var(--spacing-4);
    text-align: center;
  }
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--color-neutral-200);
    border-top: 4px solid var(--color-primary);
    border-radius: 50%;
  }
`;
document.head.appendChild(styles);