import React from "react";
import "./UserCard.scss";

type Props = {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
};

const UserCard: React.FC<Props> = ({
  id,
  firstName,
  lastName,
  avatar,
  email,
}) => {
  return (
    <div className="card__wrapper">
      <a href={`/user/${id}`}>
        <img className="card__avatar" src={avatar} alt={`${lastName}`} />
        <div className="card__info">
          <p className="card__name">
            {firstName} {lastName}
          </p>
          <p className="card__email">{email}</p>
        </div>
      </a>
    </div>
  );
};

export default UserCard;
