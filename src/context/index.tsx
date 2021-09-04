import { useContext, createContext } from "react";
import useProvideAuth from "../hooks/useProvideAuth";

export interface IAuthContext {
    user: string | null;
    signin: (cb: any) => void;
    signout: (cb: any) => void; 
  }
  
const authContext = createContext<IAuthContext>({
    user: null,
    signin: (cb) => null,
    signout: (cb) => null
});

function useAuth() {
    return useContext(authContext);
}
  
const ProvideAuth:React.FC = ({children}) => {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

const fakeAuth = {
    isAuthenticated: false,
    signin(cb:any) {
        
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb:any) {
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    }
};

export {
    useAuth,
    useProvideAuth,
    ProvideAuth,
    fakeAuth
}