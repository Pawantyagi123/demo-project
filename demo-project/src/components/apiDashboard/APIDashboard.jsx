import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Login from '../loginForm/Login';
import Dashboard from '../dashboard/Dashboard';

const APIDashboard = () => {
  // Initialize all state variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
   const { theme } = useTheme();
  return( isLoggedIn ? <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/> : <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>)
};

export default APIDashboard;