function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <div className="container text-center">
        <p>&copy; {currentYear} ExamPrep AI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

// CSS for Footer
const styles = document.createElement('style');
styles.textContent = `
  .app-footer {
    background-color: var(--color-card-bg);
    padding: var(--spacing-4) 0;
    margin-top: auto;
    border-top: 1px solid var(--color-border);
  }
`;
document.head.appendChild(styles);