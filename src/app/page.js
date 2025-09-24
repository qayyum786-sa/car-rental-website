"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Checkbox } from "primereact/checkbox";

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login data:", loginData);
    // Add your login logic here
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log("Reset password for:", forgotPasswordEmail);
    // Add your forgot password logic here
    alert("Password reset link sent to your email!");
    setActiveTab("login");
  };

  const handleSignupClick = () => {
    router.push('/signup');
  };

  return (
    <div>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Car Rental</h1>
          <p className="text-gray-600">Welcome back to your journey</p>
        </div>

        <Card className="shadow-xl border-0">
          <div className="p-6">
            {/* Tab Navigation */}
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === "login"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all text-gray-600 hover:text-gray-800`}
                onClick={handleSignupClick}
              >
                Sign Up
              </button>
            </div>

            {/* Login Form */}
            {activeTab === "login" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                  Sign In
                </h2>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <InputText
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <Password
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="w-full"
                      inputClassName="w-full"
                      feedback={false}
                      toggleMask
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Checkbox
                        checked={loginData.rememberMe}
                        onChange={(e) => setLoginData({...loginData, rememberMe: e.checked})}
                        className="mr-2"
                      />
                      <label className="text-sm text-gray-600">Remember me</label>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-800"
                      onClick={() => setActiveTab("forgot")}
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    label="Sign In"
                    className="w-full bg-blue-600 hover:bg-blue-700 border-blue-600"
                  />

                  <Divider align="center">
                    <span className="text-gray-400 text-sm">or</span>
                  </Divider>

                  <Button
                    type="button"
                    label="Continue with Google"
                    icon="pi pi-google"
                    className="w-full bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    outlined
                  />
                </form>

                {/* Sign Up Link */}
                <div className="text-center mt-4">
                  <span className="text-sm text-gray-600">
                    Don&apos;t have an account?{" "}

                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                      onClick={handleSignupClick}
                    >
                      Sign Up
                    </button>
                  </span>
                </div>
              </div>
            )}

            {/* Forgot Password Form */}
            {activeTab === "forgot" && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Reset Password
                  </h3>
                  <p className="text-sm text-gray-600">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <InputText
                      type="email"
                      placeholder="Enter your email"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      className="w-full"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    label="Send Reset Link"
                    className="w-full bg-blue-600 hover:bg-blue-700 border-blue-600"
                  />

                  <button
                    type="button"
                    className="w-full text-center text-sm text-gray-600 hover:text-gray-800"
                    onClick={() => setActiveTab("login")}
                  >
                    Back to Login
                  </button>
                </form>
              </div>
            )}
          </div>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            Need help?{" "}
            <a href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}