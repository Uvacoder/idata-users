import React, { useState, useEffect, FormEvent } from "react";
import { useParams, useHistory } from "react-router";
import usersService from "../../services/usersService";

type Props = {};

type IParams = {
  id: string;
};

const UserPage: React.FC<Props> = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { id } = useParams<IParams>();
  let history = useHistory();

  const getUserData = async (id: string) => {
    const response = await usersService.getUser(id);
    if (response) {
      const { first_name, last_name, avatar, email } = response.data;
      setFirstName(first_name);
      setLastName(last_name);
      setAvatar(avatar);
      setEmail(email);
    }
  };

  useEffect(() => {
    getUserData(id);
  }, [id]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const payload = {
      firstName,
      lastName,
      avatar,
      email,
    };

    const response = await usersService.editUser(payload);
    if (response) {
      setFirstName(response.firstName);
      setLastName(response.lastName);
      setAvatar(response.avatar);
      setEmail(response.email);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    const response = await usersService.deleteUser(id);
    if (response) {
      history.push("/");
    }
  };

  const validateForm = () => {
    if (firstName && lastName && avatar && email) return false;
    return true;
  };

  return (
    <section className="user__wrapper">
      <div className="user__actions-wrapper">
        <button
          className="user__actions-edit"
          type="button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancelar" : "Editar"}
        </button>
        <button
          onClick={handleDelete}
          className="user__actions-delete"
          type="button"
        >
          Eliminar
        </button>
      </div>
      <div className="user__info">
        <form onSubmit={handleSubmit}>
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
          {isEditing && (
            <button
              type="submit"
              className="user__form-button"
              disabled={validateForm()}
            >
              Guardar
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default UserPage;
