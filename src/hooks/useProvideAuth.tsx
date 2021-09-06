import { useState, useEffect } from 'react';
import { Auth } from '../context';

function useProvideAuth() {
  const [user, setUser] = useState<null | string>(localStorage.getItem('token') || null);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token) setUser('user');
  }, [])

  const signin = (cb: () => void, user: string, password: string) => {
    return Auth.signin(() => {
      setUser(localStorage.getItem('token') ? user : null);
      cb();
    },
    user,
    password);
  };

  const signout = (cb: () => void) => {
    return Auth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}

export default useProvideAuth;
