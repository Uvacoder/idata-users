import { useContext, createContext } from "react";
import useProvideAuth from "../hooks/useProvideAuth";
import userService from "../services/userService";

export interface IAuthContext {
	user: string | null;
	signin: (cb: any, user: string, password: string) => void;
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

const Auth = {
	isAuthenticated: false,
	async signin(cb: () => void, user: string, password: string) {
		const response = await userService.signin(user, password);
		Auth.isAuthenticated = response;
		setTimeout(cb, 1000);
	},
	signout(cb: () => void) {
        localStorage.clear();
		Auth.isAuthenticated = false;
		setTimeout(cb, 100);
	}
};

export {
    useAuth,
    useProvideAuth,
    ProvideAuth,
    Auth
}