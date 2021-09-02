import {useState} from 'react';
import { fakeAuth } from '../context';

function useProvideAuth() {
    const [user, setUser] = useState<null | string>(null);
  
    const signin = (cb: any) => {
      return fakeAuth.signin(() => {
        setUser("user");
        cb();
      });
    };
  
    const signout = (cb:any) => {
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
