import React from "react";
import "./UserForm.scss";

type Props = {
  isEditing: boolean;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setAvatar: (value: string) => void;
  setEmail: (value: string) => void;
};

const UserForm: React.FC<Props> = ({
  isEditing,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  avatar,
  setAvatar,
}) => {
  return (
    <>
      <div className="user__form-group">
        <label htmlFor="firstName">Nombre</label>
        <input
          type="text"
          id="firstName"
          className="user__form-input"
          value={firstName}
          name="firstName"
          onChange={(e) => setFirstName(e.target.value)}
          disabled={!isEditing}
        />
      </div>
      <div className="user__form-group">
        <label htmlFor="firstName">Apellido</label>
        <input
          type="text"
          id="lastName"
          className="user__form-input"
          value={lastName}
          name="lastName"
          onChange={(e) => setLastName(e.target.value)}
          disabled={!isEditing}
        />
      </div>
      <div className="user__form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          className="user__form-input"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          disabled={!isEditing}
        />
      </div>
      <div className="user__form-group">
        <label htmlFor="avatar">URL Imagen</label>
        <input
          type="text"
          id="avatar"
          className="user__form-input"
          value={avatar}
          name="avatar"
          onChange={(e) => setAvatar(e.target.value)}
          disabled={!isEditing}
        />
      </div>
    </>
  );
};

export default UserForm;
