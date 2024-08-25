
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import UrlManagement from './components/UrlManagement';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Switch>
          <Route path="/login" component={AuthForm} />
          <Route path="/register" component={AuthForm} />
          <Route path="/" component={UrlManagement} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
