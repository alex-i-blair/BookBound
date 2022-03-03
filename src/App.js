import './styles/App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import AuthPage from './AuthPage';
import { getUser, logout } from './services/fetch-utils';
import ReadingList from './ReadingList';
import SearchPage from './SearchPage';
import BookDetails from './BookDetails';
import AboutPage from './AboutPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetch() {
      const user = await getUser();
      if (user) setCurrentUser(user);
    }

    fetch();
  }, []);

  async function handleLogout() {
    await logout();
    setCurrentUser(null);
  }
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {currentUser && (
            <div className="nav-links-container">
              <NavLink className="nav-links" activeClassName="nav-links-active" to="/search-page">
                Search
              </NavLink>
              <NavLink className="nav-links" activeClassName="nav-links-active" to="/reading-list">
                My Bookshelf
              </NavLink>
              <NavLink className="nav-links" activeClassName="nav-links-active" to="/about-page">
                About Us
              </NavLink>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </header>
        <Switch>
          <Route exact path="/">
            {currentUser ? (
              <Redirect to="/reading-list" />
            ) : (
              <AuthPage setCurrentUser={setCurrentUser} />
            )}
          </Route>
          <Route exact path="/reading-list">
            {currentUser ? <ReadingList /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/search-page">
            {currentUser ? <SearchPage /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/book-details/:id">
            {currentUser ? <BookDetails /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/about-page">
            {currentUser ? <AboutPage /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
