import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import PrivateRoute from "./components/PrivateRoute";
import { ProvideAuth } from "./context";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import UserPage from "./pages/user";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute exact path="/">
            <HomePage />
          </PrivateRoute>
          <PrivateRoute path="/user/:id">
            <UserPage />
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
