import { FC, useReducer, useEffect } from 'react';
import { AuthContext } from './';
import Cookies from 'js-cookie';
import axios from '../../services/base.services';
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
  

    const loginUser = async( email: string, password: string ): Promise<any> => {
        try {
            const { data } = await axios.post('/login', { email, password });
            if(data.status == 200){
                const { token } = data;
                Cookies.set('token', token );
                Cookies.set('user',  JSON.stringify(data))
                dispatch({ type: '[Auth] - Login', payload: data});
                return data.message;
            }
            return false;
        } catch (error: any) {
            console.log(error);
            return {
                hasError: true,
                message: error.response.data.message
            }
        }
    }

    const logoutUser = async(): Promise<boolean> => {
        try {
            const { data } = await axios.post('/logout');
            if(data.status == 200){
                router.replace('/auth/login')
                Cookies.remove('token')
                delete axios.defaults.headers.common["Authorization"];
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
            const cookie = Cookies.get('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
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
                message: error.response.data.message
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