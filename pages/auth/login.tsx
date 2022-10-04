import Link from "next/link";
import React, { useContext, useState } from "react";
import { AuthLayout } from "../../components/layouts";
import { AuthContext } from "../../context/auth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { ExclamationTriangleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";
import * as cookie from "cookie";
import { ErrorComponent } from "../../components/ui/ErrorComponent";
import { SuccessComponent } from "../../components/ui/SuccessComponent";
import { LoaderOverlay } from "../../components/ui/LoaderOverlayComponent";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { loginUser } = useContext(AuthContext);
  const [formError, setFormError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsLoading] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const param = router.query.p?.toString();
  const onLoginUser = async ({ email, password }: FormData) => {
    try {
      setFormError(false);
      setIsLoading("Authenticating...");
      const response = await loginUser(email, password);
      if (response.hasError) {
        setFormError(true);
        setErrorMessage(response?.message as string);
      } else {
        setSuccessMessage(response);
        router.push(param ?? "/");
      }
      setIsLoading("");
    } catch (error) {
      setFormError(true);
      setTimeout(() => setFormError(false), 3000);
      console.log(error);
    }
  };

  return (
    <AuthLayout title={"Login"}>
      {isUploading && <LoaderOverlay primaryMessage={""} fullScreen={true} />}
      <section className="h-screen">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email Address is required",
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

                <div className="mb-6">
                    <div className="relative">
                      <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...register("password", {
                          required: "Password is required",
                          })}
                          className="text-md block px-3 py-2 rounded-lg 
                          focus:outline-none w-full mt-2 border focus:ring-1 focus:ring-blue-600"
                      />
                      <div className="absolute inset-y-0 right-0 flex text-sm leading-5">
                        {showPassword ? <EyeSlashIcon onClick={() => setShowPassword(false)}  className="w-2/4" /> : <EyeIcon onClick={() => setShowPassword(true)}  className="w-2/4" /> }
                      </div>
                    </div>
                  {errors.password && (
                    <div className="flex pt-2 pl-2 text-red-700">
                      <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                      <p className="px-2">{errors.password?.message}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mb-6">
                  <Link href="/auth/forgot-password">
                    <a className="text-sm text-blue-600 hover:underline">
                      Forgot password?
                    </a>
                  </Link>
                </div>

                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                >
                  Log in
                </button>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">
                    Don’t have an account yet?
                  </p>
                </div>
                <Link href="/auth/register">
                  <a className="px-7 py-3 text-gray-400 border-gray-400 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3">
                    Sign up
                  </a>
                </Link>
                {formError && (
                  <div className="mt-3">
                    <ErrorComponent primaryMessage={errorMessage} />
                  </div>
                )}
                {successMessage && (
                  <SuccessComponent primaryMessage={successMessage} />
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const parsedCookies = cookie.parse(req.headers.cookie ?? "");
  const token = parsedCookies.token;
  const { p = "/" } = query;
  if (token) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default LoginPage;
