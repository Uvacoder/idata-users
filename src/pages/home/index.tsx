import React from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../context';

const HomePage = () => {
	const history = useHistory();
  const auth = useAuth();

	return (
		<section>
			<button
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Salir
      </button>


		</section>
	);
}

export default HomePage;
