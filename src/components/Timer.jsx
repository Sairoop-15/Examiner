import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Timer({ seconds, onTimeUp, warningThreshold = 30 }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  
  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Determine timer class based on remaining time
  const getTimerClass = () => {
    if (timeLeft <= warningThreshold / 2) return 'timer timer-danger';
    if (timeLeft <= warningThreshold) return 'timer timer-warning';
    return 'timer';
  };
  
  return (
    <div className={getTimerClass()}>
      <div className="timer-icon">⏱</div>
      <motion.div 
        className="timer-text"
        key={timeLeft <= warningThreshold ? 'warning' : 'normal'}
        animate={
          timeLeft <= warningThreshold / 2 
            ? { scale: [1, 1.1, 1], color: ['#e74c3c', '#e74c3c'] }
            : {}
        }
        transition={{ duration: 0.5, repeat: timeLeft <= warningThreshold / 2 ? Infinity : 0, repeatDelay: 0.5 }}
      >
        {formatTime(timeLeft)}
      </motion.div>
    </div>
  );
}

export default Timer;

// CSS for Timer
const styles = document.createElement('style');
styles.textContent = `
  .timer {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    font-size: var(--font-size-lg);
    font-weight: 600;
    padding: var(--spacing-2) var(--spacing-4);
    background-color: var(--color-neutral-100);
    border-radius: var(--radius-md);
  }
  
  .timer-warning {
    background-color: var(--color-warning);
    color: white;
  }
  
  .timer-danger {
    background-color: var(--color-error);
    color: white;
  }
  
  .timer-icon {
    font-size: var(--font-size-xl);
  }
`;
document.head.appendChild(styles);