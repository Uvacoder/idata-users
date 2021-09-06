import React from "react";
import { useHistory } from "react-router";
import "./goBack.scss";

const GoBack: React.FC = () => {
  let history = useHistory();

  return (
    <div className="go-back">
      <button className="btn" onClick={() => history.goBack()}>
        Volver
      </button>
    </div>
  );
};

export default GoBack;
