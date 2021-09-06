import { useState, useEffect } from 'react';
import { fakeAuth } from '../context';

function useProvideAuth() {
  const [user, setUser] = useState<null | string>(localStorage.getItem('token') || null);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token) setUser('user');
  }, [])

  const signin = (cb: () => void, user: string, password: string) => {
    return fakeAuth.signin(() => {
      setUser(user);
      cb();
    },
    user,
    password);
  };

  const signout = (cb: () => void) => {
    return fakeAuth.signout(() => {
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
