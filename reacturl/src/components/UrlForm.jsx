// src/components/UrlForm.js

import React, { useState } from 'react';
import { generateShortUrl, getCurrentUser, getUrlsFromStorage, saveUrlsToStorage } from '../utils';

const UrlForm = ({ onUrlAdded }) => {
  const [title, setTitle] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentUser = getCurrentUser();
    const urls = getUrlsFromStorage(currentUser);

    if (urls.length >= 5) {
      setError('URL limit reached. Maximum 5 URLs allowed.');
      return;
    }

    const shortUrl = generateShortUrl();
    const newUrl = { title, originalUrl, shortUrl, createdAt: new Date() };
    urls.push(newUrl);
    saveUrlsToStorage(currentUser, urls);
    onUrlAdded();
    setTitle('');
    setOriginalUrl('');
  };

  return (
    <div>
      <h2>Add a New URL</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="url"
            placeholder="Original URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Shorten URL</button>
      </form>
    </div>
  );
};

export default UrlForm;
