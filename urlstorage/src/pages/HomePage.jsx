import React from 'react';
import { useSelector } from 'react-redux';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';

function HomePage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="home-page">
      {user ? (
        <>
          <UrlForm />
          <UrlList />
        </>
      ) : (
        <p>Please log in to manage your URLs.</p>
      )}
    </div>
  );
}

export default HomePage;
