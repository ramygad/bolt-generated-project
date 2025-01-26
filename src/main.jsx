import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    &lt;React.StrictMode&gt;
      &lt;BrowserRouter&gt;
        &lt;App /&gt;
      &lt;/BrowserRouter&gt;
    &lt;/React.StrictMode&gt;
  );
} catch (error) {
  console.error('Failed to render React app:', error);
  document.getElementById('root').innerHTML = `
    &lt;div style="padding: 20px; color: red;"&gt;
      &lt;h1&gt;Application Error&lt;/h1&gt;
      &lt;p&gt;${error.message}&lt;/p&gt;
      &lt;p&gt;Please check the console for more details.&lt;/p&gt;
    &lt;/div&gt;
  `;
}
