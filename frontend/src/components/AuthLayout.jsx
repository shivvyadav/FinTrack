import React from "react";
import { Link, useLocation } from "react-router-dom";

const AuthLayout = ({ title, children }) => {
  const { pathname } = useLocation();
  const isLogin = pathname === "/login";

  return (
    <div className="bg-background text-primary flex min-h-screen transition-colors duration-300">
      {/* Left section - form */}
      <div className="relative flex w-full flex-col px-6 pt-8 sm:px-12 md:w-1/2 lg:px-20">
        <h1 className="text-primary text-2xl font-semibold">FinTrack</h1>
        <div>
          <h2 className="mt-4 mb-2 text-xl font-semibold">
            {isLogin ? "Welcome to FinTrack" : "Create your FinTrack account"}
          </h2>
          <p className="text-secondary mb-6">
            {isLogin
              ? "Start your experience with FinTrack by signing in."
              : "Join FinTrack to manage your expenses smarter."}
          </p>

          {/* Toggle Tabs */}
          <div className="border-border mb-8 flex space-x-2 rounded-xl border p-1">
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
          <div className="bg-foreground border-border rounded-2xl border p-6 shadow-sm">
            {children}
          </div>
        </div>
      </div>

      {/* Right Section - Hero Image */}
      <div className="bg-foreground border-border hidden w-1/2 items-center justify-center border-l md:flex">
        {/* Replace this with your image */}
        <div className="px-10 text-center">
          <div className="bg-background rounded-2xl p-10 shadow-sm">
            <h3 className="text-primary mb-3 text-xl font-semibold">
              A Unified Hub for Smarter Financial Decision-Making
            </h3>
            <p className="text-secondary text-sm leading-relaxed">
              Kezak empowers you with a unified financial command center —
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
