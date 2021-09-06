import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import UserCard from "../../components/UserCard";
import usersService from "../../services/usersService";
import Layout from "../layout";
import "./homePage.scss";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const HomePage: React.FC = () => {
  const history = useHistory();

  const [users, setUsers] = useState<User[] | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [perPage, setPerPage] = useState(0);

  const getUsers = async (page?: number) => {
    const response = await usersService.getUsers(page);
    if (response) {
      const { data, page, total, total_pages, per_page } = response;
      setUsers(data);
      setPage(page);
      setTotal(total);
      setTotalPages(total_pages);
      setPerPage(per_page);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const changePage = (variation: number) => {
    const newPage = page + variation;
    getUsers(newPage);
  };

  return (
    <>
      <Layout />
      <section className="home__wrapper">
        <h2 className="home__cards-title">Lista de usuarios</h2>
        <div className="home__new-user">
          <button
            className="btn btn-fill"
            onClick={() => history.push("/user/new")}
          >
            Nuevo Usuario
          </button>
        </div>
        <div className="home__cards-wrapper">
          {users &&
            users.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                firstName={user.first_name}
                lastName={user.last_name}
                avatar={user.avatar}
                email={user.email}
              />
            ))}
        </div>
        <div className="home__pagination-wrapper">
          <p>
            Mostrando <b>{perPage}</b> usuarios de <b>{total}</b>
          </p>
          <button
            className="btn"
            type="button"
            onClick={() => changePage(-1)}
            disabled={page === 0}
          >
            &lt;
          </button>
          <span>
            página <b>{page}</b> de <b>{totalPages}</b>
          </span>
          <button
            className="btn"
            type="button"
            onClick={() => changePage(1)}
            disabled={page === totalPages}
          >
            &gt;
          </button>
        </div>
      </section>
    </>
  );
};

export default HomePage;
