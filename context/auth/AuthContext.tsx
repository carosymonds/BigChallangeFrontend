

import { createContext } from 'react';
import { IUser } from '../../interfaces/user';


type FormData = {
    email: string,
    password: string,
    password_confirmation: string,
    name: string,
    role: 'doctor' | 'patient',
    gender: 'female' | 'male' | 'other',
    weight: number,
    height: number,
    diseases: string,
    speciality: string,
    grade: number,
};

interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;

    loginUser: (email: string, password: string) => Promise<boolean>;
    registerUser: (data: FormData) => Promise<{ hasError: boolean; message?: string; }>;
    logoutUser: ()=>  void;
}


export const AuthContext = createContext({} as ContextProps );