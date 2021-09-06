import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../context';
import usersService from '../../services/usersService';

type User = {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	avatar: string;
}

const HomePage = () => {
	const history = useHistory();
  const auth = useAuth();

	const [users, setUsers] = useState<User[] | null>(null);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(null);
	const [totalPages, setTotalPages] = useState(null);

	const getUsers = async (page?: number) => {
		const response = await usersService.getUsers(page)
		if (response) {
			const {data, page, total, total_pages} = response;
			setUsers(data);
			setPage(page);
			setTotal(total);
			setTotalPages(total_pages);
		}
	}

	useEffect(() => {
		getUsers();
	}, [])

	const changePage = (variation: number) => {
		const newPage = page + variation;
		getUsers(newPage)
	}

	return (
		<section>
			<button
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Salir
      </button>
			{users && users.map(({id, first_name, last_name, avatar, email}) => (
				<div key={id}>
					<img src={avatar} alt={`${last_name}`} />
					<p>{first_name} {last_name}</p>
					<p>{email}</p>
				</div>
			))}
			<div>
				<p>Total de usuarios: {total}</p>
				<button
					type="button"
					onClick={() => changePage(-1)}
					disabled={page === 0}
					>
						Anterior
					</button>
				<span>página {page} de {totalPages}</span>
				<button
					type="button"
					onClick={() => changePage(1)}
					disabled={page === totalPages}
					>
						Siguiente
					</button>
			</div>
		</section>
	);
}

export default HomePage;
