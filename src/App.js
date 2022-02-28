import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import AuthPage from './AuthPage';
import { getUser, logout } from './services/fetch-utils';

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
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            {
              currentUser
                ? <Redirect to='/reading-list' />
                : <AuthPage setCurrentUser={setCurrentUser} />
            }

          </Route>
        </Switch>
      </Router>
      <header className="App-header"></header>
    </div>
  );
}

export default App;
