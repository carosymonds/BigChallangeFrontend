import React from "react";
import { AuthLayout } from "../../components/layouts";

const RegisterPage = () => {
  return (
    <AuthLayout title={"Login"}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-500">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <h3 className="text-xl text-center">Create account</h3>
          <form action="">
            <div className="grid grid-cols-1 text-sm">
              <div className="grid grid-cols-2">
                <div className="px-4 py-2">
                  <input
                    type="text"
                    placeholder="Email"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div className="px-4 py-2">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div className="px-4 py-2">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>
              <div className="flex items-baseline justify-between px-4">
                <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                  Login
                </button>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="mt-5 pt-2 border-t-2 border-gray-200 align-middle">
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Do you have an account?{" "}
                  <a
                    href="/auth/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Log in
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
