import  { useState, useEffect } from 'react';
import axios from 'axios';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';

function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/url/list?page=${page}`, {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setUrls(res.data.urls);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <UrlForm setUrls={setUrls} />
      {loading ? <p>Loading...</p> : <UrlList urls={urls} setUrls={setUrls} />}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <li key={i} className={`page-item ${i + 1 === page ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;
