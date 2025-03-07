import { history, Outlet } from '@umijs/max';
import React, { useEffect, useState } from 'react';
const AuthGuard: React.FC<{ children: JSX.Element }> = () => {
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      history.replace('/login');
    }
  }, []);

  return <Outlet></Outlet>;
};

export default AuthGuard;
