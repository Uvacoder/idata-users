import React from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../context";
import "./layout.scss";

const Layout = () => {
  const auth = useAuth();
  const history = useHistory();

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <span className="nav__logo">Contáctame</span>
        <button
          className="btn"
          onClick={() => {
            auth.signout(() => history.push("/"));
          }}
        >
          Salir
        </button>
      </div>
    </nav>
  );
};

export default Layout;
