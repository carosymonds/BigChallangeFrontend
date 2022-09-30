

import { createContext } from 'react';
import { FormData, IUser } from '../../interfaces/user';



interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;

    loginUser: (email: string, password: string) => Promise<any>;
    registerUser: (data: FormData) => Promise<{ hasError: boolean; message?: string; }>;
    logoutUser: ()=>  void;
}


export const AuthContext = createContext({} as ContextProps );