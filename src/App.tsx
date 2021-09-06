import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // useHistory,
} from 'react-router-dom';
import './App.scss';
import PrivateRoute from './components/PrivateRoute';
import { ProvideAuth, useAuth } from './context';
import HomePage from './pages/home';
import LoginPage from './pages/login';

function App() {
  return (
    <ProvideAuth>
      <Router>
        {/* <div>
          <AuthButton />

          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/">Home Page</Link>
            </li>
          </ul> */}

          <Switch>
            <Route path="/public">
              <PublicPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/">
              <HomePage />
            </PrivateRoute>
          </Switch>
        {/* </div> */}
      </Router>
    </ProvideAuth>
  );
}

/* function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <p>
      Welcome!
      <button
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
} */




function PublicPage() {
  return <h3>Public</h3>;
}

export default App;
