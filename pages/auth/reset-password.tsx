import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../../components/layouts";

import {
  ErrorComponent,
  LoaderOverlay,
  SuccessComponent,
} from "../../components/ui";
import { AuthContext } from "../../context";

type FormData = {
  password: string;
  password_confirmation: string;
  email: string;
};

const ResetPassowrd = () => {
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const { resetPassword } = useContext(AuthContext);

 
  const router = useRouter()

  const [formError, setFormError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsLoading] = useState("");

  const onRegisterUser = async (formData: FormData) => {
    try {
      const token = router.query.token as string;
      setFormError(false);
      setIsLoading("Sending email...");
      const response = await resetPassword(
        formData.email,
        formData.password,
        formData.password_confirmation,
        token
      );
      if (response.hasError) {
        setFormError(true);
        setErrorMessage(response.message as string);
      } else {
        setSuccessMessage(response.message as string);
        setTimeout(() => router.push('/auth/login'), 1000)
      }
      setIsLoading("");
    } catch (error) {
      setFormError(true);
      setTimeout(() => setFormError(false), 3000);
    }
  };

  const password = useRef({});
  password.current = watch("password", "");
  return (
    <AuthLayout title={"Reset password"}>
      {isUploading && <LoaderOverlay primaryMessage={""} fullScreen={true} />}
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-500">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <div className="text-center">
            <h1 className="font-bold text-3xl text-gray-900">
              Create new password
            </h1>
            <p className="text-sm p-2">
              Your new password must be different from previous used passwords.
            </p>
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
                <div className="px-4 py-2">
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "should be at least 6 character long",
                      },
                      maxLength: {
                        value: 30,
                        message: "should contain less than 30 character lon",
                      },
                    })}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  {errors.password && (
                    <div className="flex pt-2 pl-2 text-red-700">
                      <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                      <p className="px-2">{errors.password?.message}</p>
                    </div>
                  )}
                </div>
                <div className="px-4 py-2">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register("password_confirmation", {
                      required: "Passwords do not match",
                      validate: (value) =>
                        value === password.current || "Passwords do not match",
                    })}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  {errors.password_confirmation && (
                    <div className="flex pt-2 pl-2 text-red-700">
                      <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                      <p className="px-2">
                        {errors.password_confirmation?.message}
                      </p>
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
  );
};

export default ResetPassowrd;
