// src/components/UrlList.js

import React, { useState, useEffect } from 'react';
import { getCurrentUser, getUrlsFromStorage, saveUrlsToStorage } from '../utils';

const UrlList = () => {
  const [urls, setUrls] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const currentUser = getCurrentUser();
    const storedUrls = getUrlsFromStorage(currentUser);
    setUrls(storedUrls);
  }, []);

  const handleDelete = (shortUrl) => {
    const currentUser = getCurrentUser();
    const filteredUrls = urls.filter((url) => url.shortUrl !== shortUrl);
    setUrls(filteredUrls);
    saveUrlsToStorage(currentUser, filteredUrls);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredUrls = urls.filter(
    (url) =>
      url.title.toLowerCase().includes(search.toLowerCase()) ||
      url.originalUrl.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Your URLs</h2>
      <input
        type="text"
        placeholder="Search by title or URL"
        value={search}
        onChange={handleSearch}
      />
      {filteredUrls.length === 0 && <p>No URLs found.</p>}
      <ul>
        {filteredUrls.map((url) => (
          <li key={url.shortUrl}>
            <strong>{url.title}</strong> - {url.originalUrl} - {url.shortUrl} - Added on{' '}
            {new Date(url.createdAt).toLocaleString()}
            <button onClick={() => handleDelete(url.shortUrl)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlList;
