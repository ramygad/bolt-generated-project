import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

function renderFallback() {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <h1>Welcome to eLearning Platform</h1>
        <p>If you're seeing this, the React app failed to load.</p>
        <p>Please check the browser console for errors.</p>
      </div>
    `;
  }
}

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('React rendering failed:', error);
  renderFallback();
}
