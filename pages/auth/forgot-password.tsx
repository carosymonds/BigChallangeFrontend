import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import Link from "next/link";
import { AuthLayout } from '../../components/layouts';
import { ErrorComponent, LoaderOverlay, SuccessComponent } from '../../components/ui';
import { AuthContext } from '../../context';

type FormData = {
    email: string;
  };

const ForgotPassword = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },

      } = useForm<FormData>();
      const { forgotPassword } = useContext(AuthContext);

      const [formError, setFormError] = useState(false);
      const [successMessage, setSuccessMessage] = useState("");
      const [errorMessage, setErrorMessage] = useState("");
      const [isUploading, setIsLoading] = useState("");

    const onRegisterUser = async (formData: FormData) => {
        try {
          setFormError(false);
          setIsLoading('Sending email...')
          const response = await forgotPassword(formData.email);
          if(response.hasError){
            setFormError(true);
            setErrorMessage(response.message as string)
          }else{
            setSuccessMessage(response.message as string);
          }
          setIsLoading('')
        } catch (error) {
          setFormError(true);
          setTimeout(() => setFormError(false), 3000);
        }
      };
  return (
    <AuthLayout title={"Forgot password"}>
    {isUploading && <LoaderOverlay primaryMessage={""} fullScreen={true} />}
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-500">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-4/6">
        <div className="text-center">
          <h1 className="font-bold text-3xl text-gray-900">Forgot Your Password?</h1>
          <p>{`Just enter your email address below and we'll send you a link to reset your password!`}</p>
        </div>
        <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
          <div className="grid grid-cols-1 text-sm">
            <div className="grid grid-cols-1">
              <div className="px-4 py-2">
                <input
                  type="text"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {errors.email && (
                  <div className="flex pt-2 pl-2 text-red-700">
                    <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                    <p className="px-2">{errors.email?.message}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-baseline justify-between px-4 mt-5">
              <button
                type="submit"
                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              >
                Reset password
              </button>
            </div>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">
                  Do you have an account?
                </p>
            </div>
            {formError && (
                  <div className="mt-3">
                    <ErrorComponent primaryMessage={errorMessage} />
                  </div>
                )}
                {successMessage && (
                  <SuccessComponent primaryMessage={successMessage} />
                )}
            <Link href="/auth/login">
              <a className="px-7 py-3 text-gray-400 border-gray-400 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3">
                Login
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
     </AuthLayout>
  )
}

export default ForgotPassword;
