type JSONResponse = {
  token: string;
  status?: number;
};

const url = "https://reqres.in/api";

async function signin(user: string, password: string) {
  localStorage.clear();
  const response = await fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email: user, password }),
  });

  if (response && response.status === 200) {
    const { token }: JSONResponse = await response.json();
    localStorage.setItem("token", token);
    return true;
  }

  return false;
}

const userService = {
  signin,
};

export default userService;
