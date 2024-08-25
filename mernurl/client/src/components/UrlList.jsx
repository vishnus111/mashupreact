
import axios from 'axios';

function UrlList({ urls, setUrls }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/url/delete/${id}`, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      setUrls(prev => prev.filter(url => url._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-3">
      <h3>Your URLs</h3>
      <ul className="list-group">
        {urls.map(url => (
          <li key={url._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{url.title}</h5>
              <p><a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a></p>
              <small>{new Date(url.addedAt).toLocaleString()}</small>
            </div>
            <button className="btn btn-danger" onClick={() => handleDelete(url._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UrlList;
