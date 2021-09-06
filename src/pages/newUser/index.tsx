import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router";
import UserForm from "../../components/UserForm";
import usersService from "../../services/usersService";

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
    <section className="user__wrapper">
      <div className="user__go-back">
        <button onClick={() => history.goBack()}>Volver</button>
      </div>
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

export default NewUser;
