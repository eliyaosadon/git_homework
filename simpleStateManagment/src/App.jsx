import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext.jsx';
import ShoppingCart from './ShoppingCart.jsx';
import RegistrationForm from './RegistrationForm.jsx';

function PageContent() {
  const { theme, setTheme, fontSize, setFontSize } = useTheme();

  const styles = {
    backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    fontSize: fontSize === 'small' ? '12px' : fontSize === 'large' ? '20px' : '16px',
    minHeight: '100vh',
    padding: '20px'
  };

  return (
    <div style={styles}>
      <h1>User Dashboard</h1>

      <section>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme (Current: {theme})
        </button>
        <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </section>

      <hr />
      <ShoppingCart />
      <hr />
      <RegistrationForm />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PageContent />
    </ThemeProvider>
  );
}