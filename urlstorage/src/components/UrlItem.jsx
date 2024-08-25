import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUrl, updateUrl } from '../redux/slices/urlSlice';

function UrlItem({ url }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(url.title);
  const [newUrl, setNewUrl] = useState(url.originalUrl);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteUrl(url.id));
  };

  const handleUpdate = () => {
    dispatch(updateUrl({ ...url, title: newTitle, originalUrl: newUrl }));
    setIsEditing(false);
  };

  return (
    <li className="list-group-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="form-control mb-2"
          />
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="form-control mb-2"
          />
          <button className="btn btn-success btn-sm mr-2" onClick={handleUpdate}>
            Save
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h5>{url.title}</h5>
          <p>
            Original URL: <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">{url.originalUrl}</a>
          </p>
          <p>
            Short URL: <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a>
          </p>
          <small>Added on: {new Date(url.addedAt).toLocaleString()}</small>
          <button className="btn btn-primary btn-sm ml-3" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="btn btn-danger btn-sm ml-2" onClick={handleDelete}>
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default UrlItem;
