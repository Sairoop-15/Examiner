import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Header() {
  return (
    <motion.header 
      className="app-header"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex justify-between align-center">
        <Link to="/" className="logo">
          <h1>ExamPrep AI</h1>
        </Link>
        <nav className="main-nav">
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">Home</Link></li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}

export default Header;

// CSS for Header
const styles = document.createElement('style');
styles.textContent = `
  .app-header {
    background-color: var(--color-card-bg);
    box-shadow: var(--shadow-sm);
    padding: var(--spacing-4) 0;
  }
  
  .logo {
    display: flex;
    align-items: center;
    color: var(--color-primary);
    text-decoration: none;
  }
  
  .logo h1 {
    font-size: var(--font-size-2xl);
    margin: 0;
  }
  
  .main-nav {
    display: flex;
    align-items: center;
  }
  
  .nav-list {
    display: flex;
    gap: var(--spacing-4);
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .nav-link {
    color: var(--color-text);
    font-weight: 500;
    transition: color var(--transition-fast);
    padding: var(--spacing-2);
  }
  
  .nav-link:hover {
    color: var(--color-primary);
    text-decoration: none;
  }
  
  @media (max-width: 768px) {
    .logo h1 {
      font-size: var(--font-size-xl);
    }
  }
`;
document.head.appendChild(styles);