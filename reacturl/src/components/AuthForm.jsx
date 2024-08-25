// src/components/AuthForm.js

import  { useState } from 'react';
import { getUsersFromStorage, saveUsersToStorage, login } from '../utils';

const AuthForm = ({ onAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getUsersFromStorage();
    const existingUser = users.find((user) => user.username === username);

    if (isSignUp) {
      if (existingUser) {
        setError('Username already exists.');
        return;
      }
      const newUser = { username, password };
      users.push(newUser);
      saveUsersToStorage(users);
      login(username);
      onAuth();
    } else {
      if (!existingUser || existingUser.password !== password) {
        setError('Invalid credentials.');
        return;
      }
      login(username);
      onAuth();
    }
  };

  return (
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
      </button>
    </div>
  );
};

export default AuthForm;
