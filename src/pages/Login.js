import React, { useState, useContext } from 'react';
import { UserContext } from '../components/contexts/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { login } = useContext(UserContext);

  const handleLogin = () => {
    login(email, phone);
  };

  return (
    <div>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
