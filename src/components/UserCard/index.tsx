import React from "react";
import "./UserCard.scss";

type Props = {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
};

const UserCard: React.FC<Props> = ({ firstName, lastName, avatar, email }) => {
  return (
    <div className="card__wrapper">
      <img className="card__avatar" src={avatar} alt={`${lastName}`} />
      <div className="card__info">
        <p className="card__name">
          {firstName} {lastName}
        </p>
        <p className="card__email">{email}</p>
      </div>
    </div>
  );
};

export default UserCard;
