type IUser = {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
};

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

async function editUser(payload: IUser) {
  const response = await fetch(`${url}/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  if (response && response.status === 200) {
    return response.json();
  }

  return false;
}

async function deleteUser(id: string) {
  const response = await fetch(`${url}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  console.log(`response`, response);

  if (response && response.status === 204) {
    return true;
  }

  return false;
}

const usersService = {
  getUsers,
  getUser,
  editUser,
  deleteUser,
};

export default usersService;
