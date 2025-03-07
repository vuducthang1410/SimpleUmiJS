import { history, Outlet } from '@umijs/max';
import React, { useEffect, useState } from 'react';
const AuthGuard: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log(user)
    if (!user) {
      history.replace('/login');
    }
  }, []);

  return <Outlet></Outlet>;
};

export default AuthGuard;
