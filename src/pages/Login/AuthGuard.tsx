import { history, Outlet } from '@umijs/max';
import React, { useEffect, useState } from 'react';
const AuthGuard: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.replace('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return <Outlet></Outlet>;
};

export default AuthGuard;
