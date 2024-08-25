import  { useState } from 'react';
import axios from 'axios';

function UrlForm({ setUrls }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/url/add', { url, title }, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      setUrls(prev => [res.data, ...prev]);
      setUrl('');
      setTitle('');
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div className="mb-3">
      <h3>Add a new URL</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            className="form-control" 
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>URL</label>
          <input 
            type="text" 
            className="form-control" 
            value={url}
            onChange={(e) => setUrl(e.target.value)} 
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">Add URL</button>
      </form>
    </div>
  );
}

export default UrlForm;
