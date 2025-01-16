import { useTheme } from '@/context/ThemeContext';
import React, { useState } from 'react';
import { Input } from '../ui/input';

function Login({ setIsLoggedIn }) {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value) => {
    if (!value) {
      return "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (!value) {
      return "Password is required";
    } else if (value.length < 8) {
      return "Password must be at least 8 characters";
    }
    return "";
  };

  const validateForm = () => {
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    return !emailValidationError && !passwordValidationError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const isValid = validateForm();
    if (!isValid) return;

    // Proceed with login
    console.log("Logged in:", { email, password });
    setIsLoggedIn(true);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value)); // Revalidate email on change
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value)); // Revalidate password on change
  };

  return (
    <div
      className={`w-full max-w-md mx-auto mt-8 p-6 shadow-lg rounded-lg ${
        theme === "light" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold">Login to API Dashboard</h2>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
            className="w-full px-3 py-2 text-black focus:outline-none"
            value={email}
            onChange={handleEmailChange} // Dynamically update and validate
          />
          <div>{emailError && <span className="text-red-600">{emailError}</span>}</div>
        </div>
        <div>
          <Input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
            className="w-full px-3 py-2 text-black focus:outline-none"
            value={password}
            onChange={handlePasswordChange} // Dynamically update and validate
          />
          <div>{passwordError && <span className="text-red-600">{passwordError}</span>}</div>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <input type="checkbox" id="check" className="rounded" />
            <span>Remember me</span>
          </label>
          <button type="button" className="text-blue-600 hover:underline focus:outline-none">
            Forgot Password?
          </button>
        </div>
        <button
          type="submit"
          className="w-full py-2 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
