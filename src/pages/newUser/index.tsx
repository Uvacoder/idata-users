import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router";
import GoBack from "../../components/GoBack";
import UserForm from "../../components/UserForm";
import usersService from "../../services/usersService";
import Layout from "../layout";
import "./newUser.scss";

const NewUser: React.FC = () => {
  let history = useHistory();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const isEditing = true;

  const validateForm = () => {
    if (firstName && lastName && avatar && email) return false;
    return true;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const payload = {
      firstName,
      lastName,
      avatar,
      email,
    };

    const response = await usersService.newUser(payload);
    if (response) {
      history.push("/");
    }
  };

  return (
    <>
      <Layout />
      <section className="user__wrapper">
        <h2 className="user__title">Nuevo Usuario</h2>
        <div className="user__info">
          <form onSubmit={handleSubmit}>
            <UserForm
              isEditing
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

export default NewUser;
