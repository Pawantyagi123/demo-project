import { useTheme } from '@/context/ThemeContext';
import React, { useState } from 'react'
import { Input } from '../ui/input';

function Login({setIsLoggedIn}) {
    const { theme } = useTheme();
     const [email,setEmail] = useState("");
      const [password,setPassword] = useState("")
    const user = {email,password}

  const handleSubmit = (e)=>{
    e.preventDefault();
if(!email || !password){
  alert("please provide complete details")
  setIsLoggedIn(false)
}
    setIsLoggedIn(true);
    console.log("Logged in:", user);
  }
  return (
    <div>
       <div className={`w-full max-w-md mx-auto mt-8 p-6 shadow-lg rounded-lg ${theme === "light" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold">Login to API Dashboard</h2>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          id="email"
          name="email"
          autoComplete='off'
          placeholder="Email"
          className="w-full px-3 py-2 text-black focus:outline-none"
          value={email}
          required
          onChange={(e)=> setEmail(e.target.value)}
        />
        <Input
          type="password"
          id="password"
          name="password"
          autoComplete='off'
          placeholder="Password"
          className="w-full px-3 py-2 text-black focus:outline-none"
          value={password}
          required
          onChange={(e)=> setPassword(e.target.value)}
        />
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
    </div>
  )
}

export default Login
