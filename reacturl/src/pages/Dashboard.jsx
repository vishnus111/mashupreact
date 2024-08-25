// src/pages/Dashboard.js

import  { useState } from 'react';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';
import { logout } from '../utils';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [urlUpdated, setUrlUpdated] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUrlAdded = () => {
    setUrlUpdated(!urlUpdated);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <UrlForm onUrlAdded={handleUrlAdded} />
      <UrlList />
    </div>
  );
};

export default Dashboard;
