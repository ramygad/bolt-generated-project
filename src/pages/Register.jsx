import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
      navigate('/login');
    } else {
      alert('Registration failed');
    }
  };

  return (
    &lt;div className="register"&gt;
      &lt;h1&gt;Register&lt;/h1&gt;
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
        &lt;button type="submit"&gt;Register&lt;/button&gt;
      &lt;/form&gt;
    &lt;/div&gt;
  );
}

export default Register;
