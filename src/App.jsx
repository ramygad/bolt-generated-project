import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Course from './pages/Course';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) setIsAuthenticated(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return &lt;div&gt;Loading...&lt;/div&gt;;
  if (error) return &lt;div style={{ color: 'red' }}&gt;Error: {error.message}&lt;/div&gt;;

  return (
    &lt;div className="app"&gt;
      &lt;nav&gt;
        &lt;Link to="/"&gt;Home&lt;/Link&gt;
        {isAuthenticated ? (
          &lt;&gt;
            &lt;Link to="/dashboard"&gt;Dashboard&lt;/Link&gt;
            &lt;button onClick={() =&gt; {
              localStorage.removeItem('token');
              setIsAuthenticated(false);
            }}&gt;Logout&lt;/button&gt;
          &lt;/&gt;
        ) : (
          &lt;&gt;
            &lt;Link to="/login"&gt;Login&lt;/Link&gt;
            &lt;Link to="/register"&gt;Register&lt;/Link&gt;
          &lt;/&gt;
        )}
      &lt;/nav&gt;
      
      &lt;Routes&gt;
        &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
        &lt;Route path="/courses/:id" element={&lt;Course /&gt;} /&gt;
        &lt;Route path="/login" element={&lt;Login setIsAuthenticated={setIsAuthenticated} /&gt;} /&gt;
        &lt;Route path="/register" element={&lt;Register /&gt;} /&gt;
        &lt;Route path="/dashboard" element={&lt;Dashboard /&gt;} /&gt;
      &lt;/Routes&gt;
    &lt;/div&gt;
  );
}

export default App;
