import React from 'react'
import { AuthLayout } from '../../components/layouts'

const LoginPage = () => {
  return (
    <AuthLayout title={'Login'}>
       <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-500">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-xl text-center">Login to your account</h3>
                <form action="">
                    <div className="mt-4">
                        <div>
                            <input type="text" placeholder="Email"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                        </div>
                        <div className="mt-4">
                            <input type="password" placeholder="Password"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                        </div>
                        <div className="flex items-baseline justify-between">
                            <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                        </div>
                        <div className='mt-5 pt-2 border-t-2 border-gray-200'>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="/auth/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </AuthLayout>
  )
}


export default LoginPage;