import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } else {
      alert('Login failed');
    }
  };

  return (
    &lt;div className="login"&gt;
      &lt;h1&gt;Login&lt;/h1&gt;
      &lt;form onSubmit={handleSubmit}&gt;
        &lt;input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =&gt; setEmail(e.target.value)}
          required
        /&gt;
        &lt;input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =&gt; setPassword(e.target.value)}
          required
        /&gt;
        &lt;button type="submit"&gt;Login&lt;/button&gt;
      &lt;/form&gt;
    &lt;/div&gt;
  );
}

export default Login;
