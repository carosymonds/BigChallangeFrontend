import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../../components/layouts";
import { AuthContext } from "../../context";
import "react-datepicker/dist/react-datepicker.css";
import { GetServerSideProps } from "next";
import * as cookie from 'cookie';
import { LoaderOverlay } from "../../components/ui/LoaderOverlayComponent";
import { Roles } from "../../constants/Enums";

type FormData = {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
  role: "doctor" | "patient";
  gender: "female" | "male" | "other";
  weight: number;
  height: number;
  diseases: string;
  speciality: string;
  grade: number;
  birth: Date;
  previous_treatments: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const { registerUser } = useContext(AuthContext);
  const [formError, setFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [gender, setgender] = useState("other");
  const [accountType, setAccountType] = useState("patient");
  const [isUploading, setIsLoading] = useState("");

  const router = useRouter();
  const param = router.query.p?.toString();
  const onRegisterUser = async (formData: FormData) => {
    try {
      setFormError(false);
      formData.birth = startDate;
      setIsLoading('Creating account...')
      const response = await registerUser(formData);
      if(response.hasError){
        setFormError(true);
        setErrorMessage(response.message as string)
      }else{
        router.push(param ?? '/auth/login')
      }
      setIsLoading('')
    } catch (error) {
      setFormError(true);
      setTimeout(() => setFormError(false), 3000);
    }
  };

  const [startDate, setStartDate] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    setStartDate(date);
  };
  const handleDateChange = (date: Date) => {
    setStartDate(date);
  };

  const onGenderChange = (e: any) => {
    setgender(e.currentTarget.value);
  };

  const onAccountChange = (e: any) => {
    setAccountType(e.currentTarget.value);
  };

  const password = useRef({});
  password.current = watch("password", "");

  return (
    <AuthLayout title={"Login"}>
      {isUploading && <LoaderOverlay primaryMessage={""} fullScreen={true} />}
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-500 w-full">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-4/6">
          <div className="text-center">
            <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
            <p>Enter your information to register</p>
          </div>
          <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
            <div className="grid grid-cols-1 text-sm">
              <div className="px-4 py-2">
                <div className="mt-4">
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <input
                        {...register("role")}
                        checked={accountType === "patient"}
                        onChange={onAccountChange}
                        type="radio"
                        className="form-radio"
                        name="role"
                        value="patient"
                      />
                      <span className="ml-2">Patient</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        {...register("role")}
                        checked={accountType === "doctor"}
                        onChange={onAccountChange}
                        type="radio"
                        className="form-radio"
                        name="role"
                        value="doctor"
                      />
                      <span className="ml-2">Doctor</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2">
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
                    type="text"
                    placeholder="Name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  {errors.name && (
                    <div className="flex pt-2 pl-2 text-red-700">
                      <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                      <p className="px-2">{errors.name?.message}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 mt-4">
                  <label className="inline-flex items-center">
                    <input
                      {...register("gender")}
                      checked={gender === "female"}
                      onChange={onGenderChange}
                      type="radio"
                      className="form-radio"
                      name="gender"
                      value="female"
                    />
                    <span className="ml-2">Female</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      {...register("gender")}
                      checked={gender === "male"}
                      onChange={onGenderChange}
                      type="radio"
                      className="form-radio"
                      name="gender"
                      value="male"
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      {...register("gender")}
                      checked={gender === "other"}
                      onChange={onGenderChange}
                      type="radio"
                      className="form-radio"
                      name="gender"
                      value="other"
                    />
                    <span className="ml-2">Other</span>
                  </label>
                </div>
                <div className="px-4 py-2">
                  <ReactDatePicker
                    {...register("birth")}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    selected={startDate}
                    onSelect={handleDateSelect}
                    onChange={handleDateChange}
                    popperPlacement="bottom-start"
                  />
              </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2">
                  <input
                    type="number"
                    placeholder="Height"
                    {...register("height", {
                      required: "Height is required",
                      min: {
                        value: 30,
                        message: "should be at least 30",
                      },
                      max: {
                        value: 230,
                        message: "should contain less than 230",
                      },
                    })}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  {errors.height && (
                    <div className="flex pt-2 pl-2 text-red-700">
                      <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                      <p className="px-2">{errors.height?.message}</p>
                    </div>
                  )}
                </div>
                <div className="px-4 py-2">
                  <input
                    type="number"
                    placeholder="Weight"
                    {...register("weight", {
                      required: "Weight is required",
                      min: {
                        value: 1,
                        message: "should be at least 1",
                      },
                      max: {
                        value: 300,
                        message: "should contain less than 300",
                      },
                    })}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  {errors.weight && (
                    <div className="flex pt-2 pl-2 text-red-700">
                      <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                      <p className="px-2">{errors.weight?.message}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2">
                  <textarea
                    placeholder="Previous treatments"
                    {...register("previous_treatments", {
                      required: "Previous treatments is required",
                    })}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  {errors.previous_treatments && (
                    <div className="flex pt-2 pl-2 text-red-700">
                      <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                      <p className="px-2">{errors.previous_treatments?.message}</p>
                    </div>
                  )}
                </div>
                <div className="px-4 py-2">
                  <textarea
                    placeholder="Disease/s"
                    {...register("diseases", {
                      required: "Disease is required",
                    })}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  {errors.diseases && (
                    <div className="flex pt-2 pl-2 text-red-700">
                      <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                      <p className="px-2">{errors.diseases?.message}</p>
                    </div>
                  )}
                </div>
              </div>
              {accountType == Roles.Doctor && <div className="grid grid-cols-2">
                <div className="px-4 py-2">
                  <input
                    placeholder="Speciality"
                    {...register("speciality", {
                      required: "Speciality is required",
                    })}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  {errors.speciality && (
                    <div className="flex pt-2 pl-2 text-red-700">
                      <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                      <p className="px-2">{errors.speciality?.message}</p>
                    </div>
                  )}
                </div>
                <div className="px-4 py-2">
                  <input
                    type="number"
                    placeholder="Grade"
                    {...register("grade", {
                      required: "Grade is required",
                    })}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  {errors.grade && (
                    <div className="flex pt-2 pl-2 text-red-700">
                      <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                      <p className="px-2">{errors.grade?.message}</p>
                    </div>
                  )}
                </div>
              </div>}
              <div className="grid grid-cols-2">
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
                      validate: value =>
                        value === password.current || "Passwords do not match"
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
              {formError && (
                <div className="flex pt-2 pl-2 text-red-700">
                  <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                  <p className="px-2">
                    {errorMessage}
                  </p>
                </div>
              )}
              <div className="flex items-baseline justify-between px-4 mt-5">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                >
                  Register now
                </button>
              </div>
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">
                    Do you have an account?
                  </p>
              </div>
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

export default RegisterPage;
