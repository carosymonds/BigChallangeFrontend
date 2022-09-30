import Link from 'next/link';
import React, { useContext, useState } from 'react'
import { AuthLayout } from '../../components/layouts'
import { AuthContext } from '../../context/auth';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import * as cookie from 'cookie';
import { ErrorComponent } from '../../components/ui/ErrorComponent';
import { SuccessComponent } from '../../components/ui/SuccessComponent';
import { LoaderOverlay } from '../../components/ui/LoaderOverlayComponent';


type FormData = {
    email: string,
    password: string,
};

const LoginPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const { loginUser } = useContext(AuthContext);
    const [formError, setFormError] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [isUploading, setIsLoading] = useState("");

    const router = useRouter();
    const param = router.query.p?.toString();
    const onLoginUser = async({email, password}: FormData) => {
        try{            
            setFormError(false)
            setIsLoading('Authenticating...')
            const response = await loginUser(email, password)
            if(response.hasError){
                setFormError(true)
                setErrorMessage(response?.message as string)
            }else{
                setSuccessMessage(response)
                router.push(param ?? '/')
            }
            setIsLoading('')
        }catch(error){
            setFormError(true)
            setTimeout(() => setFormError(false), 3000)
            console.log(error)
        }
    }

    return (
        <AuthLayout title={'Login'}>
            {isUploading && <LoaderOverlay primaryMessage={""} fullScreen={true} />}

            <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-500 w-3/6	">
                <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-4/6">
                    <h3 className="text-xl text-center">Login to your account</h3>
                    <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                        <div className="mt-4">
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="Email"
                                    {...register("email", { 
                                        required: "Email Address is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                          }
                                    })}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                    {errors.email && 
                                    <div className='flex pt-2 pl-2 text-red-700'>
                                        <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                                        <p className="px-2">{errors.email?.message}</p>
                                    </div>}
                            </div>
                            <div className="mt-4">
                                <input 
                                    type="password"
                                    placeholder="Password"
                                    {...register("password", { 
                                        required: "Password is required", 
                                    })
                                    }
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                    {errors.password && 
                                    <div className='flex pt-2 pl-2 text-red-700'>
                                        <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                                        <p className="px-2">{errors.password?.message}</p>
                                    </div>}
                            </div>
                            {formError && (
                                <div className='mt-3'>
                                     <ErrorComponent primaryMessage={errorMessage} />
                                </div>
                            )}
                            {successMessage && (<SuccessComponent primaryMessage={successMessage} />)}

                            <div className="flex items-baseline justify-between">
                                <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                            </div>
                            <div className='mt-5 pt-2 border-t-2 border-gray-200'>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? {" "}
                                    <Link href="/auth/register" >
                                        <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                            Sign up
                                        </a>
                                    </Link>
                                </p>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        </AuthLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const parsedCookies = cookie.parse(req.headers.cookie ?? "");
    const token = parsedCookies.token;
    const {p = '/'} = query
    if (token){
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }
    return {
        props: {
            
        }
    }
}


export default LoginPage;