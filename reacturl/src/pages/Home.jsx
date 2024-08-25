// src/pages/Home.js


import AuthForm from '../components/AuthForm';
import { isAuthenticated } from '../utils';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleAuth = () => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <h1>Welcome to URL Shortener</h1>
      <AuthForm onAuth={handleAuth} />
    </div>
  );
};

export default Home;
