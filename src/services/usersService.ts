const url = "https://reqres.in/api";

async function getUsers(page = 1) {
  const response = await fetch(`${url}/users?page=${page}`);

  if (response && response.status === 200) {
    return response.json();
  }

  return false;
}

async function getUser(id: string) {
  const response = await fetch(`${url}/users/${id}`);

  if (response && response.status === 200) {
    return response.json();
  }

  return false;
}

const usersService = {
  getUsers,
  getUser,
};

export default usersService;
