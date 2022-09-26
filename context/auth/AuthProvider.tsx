import { FC, useReducer, useEffect } from 'react';
import { AuthContext } from './';
import Cookies from 'js-cookie';
import axios from '../../services/base.services';
import { useSession, signOut } from 'next-auth/react';

import { FormData, IUser } from '../../interfaces/user';
import { authReducer } from './authReducer';
import { useRouter } from 'next/router';

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
            const { data } = await axios.post('/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token );
            Cookies.set('user',  JSON.stringify(data))

            dispatch({ type: '[Auth] - Login', payload: data});
            return true;
        } catch (error) {
            return false;
        }
    }

    const logoutUser = async(): Promise<boolean> => {
        try {
            const { data } = await axios.post('/logout');
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

    useEffect(() => {
        const user = Cookies.get('user');
        if ( user ) {
          dispatch({ type: '[Auth] - Login', payload: JSON.parse(user) as IUser })
        }
      
      }, [  ])

    const registerUser = async( registerData: FormData ): Promise<{hasError: boolean; message?: string}> => {
        try {
            const { data } = await axios.post('/register', registerData);
            const { token } = data;
            Cookies.set('token', token );
            Cookies.set('user',  JSON.stringify(data))
            dispatch({ type: '[Auth] - Login', payload: data });
            return {
                hasError: false
            }

        } catch (error: any) {           

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