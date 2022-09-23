import { FC, useReducer, useEffect } from 'react';
import { AuthContext } from './';
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';
import { useSession, signOut } from 'next-auth/react';

import { FormData, IUser } from '../../interfaces/user';
import { authReducer } from './authReducer';
import { useRouter } from 'next/router';
import submissionsManagerApi from '../../api/submissionsManagerApi';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

interface Props {
    children: React.ReactNode;
}


export const AuthProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );
    
    const router = useRouter();
  

    const loginUser = async( email: string, password: string ): Promise<boolean> => {
        try {
            const { data } = await submissionsManagerApi.post('/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user});
            return true;
        } catch (error) {
            return false;
        }
    }

    const logoutUser = async(): Promise<boolean> => {
        try {
            const { data } = await submissionsManagerApi.post('/logout');
            if(data.status == 200){
                router.push('auth/login')
                Cookies.remove('token')
            }
            dispatch({ type: '[Auth] - Logout'});
            return true;
        } catch (error) {
            return false;
        }
    }


    const registerUser = async( registerData: FormData ): Promise<{hasError: boolean; message?: string}> => {
        try {
            const { data } = await submissionsManagerApi.post('/register', registerData);
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
            return {
                hasError: false
            }

        } catch (error: any) {           
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response.data.message 
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    }



    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
            logoutUser

        }}>
            { children }
        </AuthContext.Provider>
    )
};