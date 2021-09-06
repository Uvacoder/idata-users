import React, { useState, useEffect, FormEvent } from "react";
import { useParams, useHistory } from "react-router";
import GoBack from "../../components/GoBack";
import UserForm from "../../components/UserForm";
import usersService from "../../services/usersService";
import Layout from "../layout";
import "./userPage.scss";

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
      id,
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
    <>
      <Layout />
      <section className="user__wrapper">
        <div className="user__actions-wrapper">
          <button
            className="btn"
            type="button"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancelar" : "Editar"}
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-danger"
            type="button"
          >
            Eliminar
          </button>
        </div>
        <div className="user__info">
          <form onSubmit={handleSubmit}>
            <UserForm
              isEditing={isEditing}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              avatar={avatar}
              setAvatar={setAvatar}
            />
            {isEditing && (
              <button
                type="submit"
                className="btn btn-fill user__submit"
                disabled={validateForm()}
              >
                Guardar
              </button>
            )}
          </form>
        </div>
        <GoBack />
      </section>
    </>
  );
};

export default UserPage;
