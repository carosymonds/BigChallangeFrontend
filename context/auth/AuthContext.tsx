

import { createContext } from 'react';
import { FormData, IUser } from '../../interfaces/user';



interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;

    loginUser: (email: string, password: string) => Promise<any>;
    registerUser: (data: FormData) => Promise<{ hasError: boolean; message?: string; }>;
    logoutUser: ()=>  void;
    forgotPassword: (email: string)=>  Promise<{ hasError: boolean; message?: string; }>;
    resetPassword: (email:string, password: string, password_confirmation: string, token: string)=>  Promise<{ hasError: boolean; message?: string; }>;
}


export const AuthContext = createContext({} as ContextProps );