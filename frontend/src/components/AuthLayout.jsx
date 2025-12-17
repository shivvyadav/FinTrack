import React from "react";
import { Link, useLocation } from "react-router-dom";
import SpinnerCustom from "./SpinnerCustom";

const AuthLayout = ({ title, children }) => {
  const { pathname } = useLocation();
  const isLogin = pathname === "/login";

  return (
    <div className="flex min-h-screen transition-colors duration-300 bg-background text-primary">
      {/* Left section - form */}
      <div className="relative flex flex-col w-full px-6 pt-8 sm:px-12 md:w-1/2 lg:px-20">
        <h1 className="text-2xl font-semibold text-primary">FinTrack</h1>
        <div>
          <h2 className="mt-4 mb-2 text-xl font-semibold">
            {isLogin ? "Welcome to FinTrack" : "Create your FinTrack account"}
          </h2>
          <p className="mb-6 text-secondary">
            {isLogin
              ? "Start your experience with FinTrack by signing in."
              : "Join FinTrack to manage your expenses smarter."}
          </p>

          {/* Toggle Tabs */}
          <div className="flex p-1 mb-8 space-x-2 border border-border rounded-xl">
            <Link
              to="/login"
              className={`w-1/2 rounded-lg py-2 text-center ${
                isLogin ? "bg-accent-gray text-primary" : "text-secondary"
              }`}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className={`w-1/2 rounded-lg py-2 text-center ${
                !isLogin ? "bg-accent-gray text-primary" : "text-secondary"
              }`}
            >
              Sign Up
            </Link>
          </div>

          {/* Form Section */}
          <div className="p-6 border shadow-sm bg-foreground border-border rounded-2xl">
            {children}
          </div>
        </div>
      </div>

      {/* Right Section - Hero Image */}
      <div className="flex-col items-center justify-center hidden w-1/2 border-l bg-foreground border-border md:flex">
        <img src="./finn.png" alt="FinTrack" className="" />
        <div className="px-10 text-center">
          <div className="p-10 shadow-sm bg-background rounded-2xl">
            <h3 className="mb-3 text-xl font-semibold text-primary">
              A Unified Hub for Smarter Financial Decision-Making
            </h3>
            <p className="text-sm leading-relaxed text-secondary">
              FinTrack empowers you with a unified financial command center —
              delivering deep insights and a 360° view of your entire economic
              world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
