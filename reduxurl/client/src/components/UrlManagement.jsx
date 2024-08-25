import  { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createUrl, editUrl, removeUrl, fetchUrls, fetchSearchUrls, searchUrl } from '../redux/urlSlice';

function UrlManagement() {
  const dispatch = useDispatch();
  const urls = useSelector((state) => state.url.urls);
  const searchTerm = useSelector((state) => state.url.searchTerm);
  const loading = useSelector((state) => state.url.loading);
  const error = useSelector((state) => state.url.error);

  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    dispatch(fetchUrls());
  }, [dispatch]);

  const handleAddUrl = () => {
    if (newTitle && newUrl) {
      const shortUrl = `short.ly/${Math.random().toString(36).substring(2, 7)}`;
      dispatch(createUrl({ title: newTitle, originalUrl: newUrl, shortUrl }));
      setNewTitle('');
      setNewUrl('');
    } else {
      alert('Please fill in both fields');
    }
  };

  const handleSearch = (e) => {
    dispatch(searchUrl(e.target.value));
    dispatch(fetchSearchUrls(e.target.value));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>URL Management</h2>
      <input
        type="text"
        placeholder="Title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL"
        value={newUrl}
        onChange={(e) => setNewUrl(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleAddUrl}>
        Add URL
      </button>
      <input
        type="text"
        placeholder="Search by title or URL"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url._id}>
              <td>{url.title}</td>
              <td>{url.shortUrl}</td>
              <td>{url.originalUrl}</td>
              <td>{new Date(url.createdAt).toLocaleString()}</td>
              <td>
                <button className="btn btn-warning" onClick={() => dispatch(editUrl(url._id, { title: 'Updated Title', originalUrl: 'http://updated-url.com' }))}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => dispatch(removeUrl(url._id))}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UrlManagement;
