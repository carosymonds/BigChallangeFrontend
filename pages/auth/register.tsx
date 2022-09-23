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

  const router = useRouter();
  const param = router.query.p?.toString();
  const onRegisterUser = async (formData: FormData) => {
    try {
      setFormError(false);
      formData.birth = startDate;
      const { hasError, message } = await registerUser(formData);
      if(hasError){
        setFormError(true);
        setErrorMessage(message?.message as string)
        setTimeout(() => setFormError(false), 3000);
      }else{
        router.push(param ?? '/login')
      }
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-500 w-full">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-4/6">
          <h3 className="text-xl text-center">Create account</h3>
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
              <div className="grid grid-cols-2">
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
              </div>
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
              <div className="flex items-baseline justify-between px-4">
                <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                  Register
                </button>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="mt-5 pt-2 border-t-2 border-gray-200 align-middle">
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Do you have an account?{" "}
                  <Link href="/auth/login">
                    <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Login
                    </a>
                  </Link>
                </p>
              </div>
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
