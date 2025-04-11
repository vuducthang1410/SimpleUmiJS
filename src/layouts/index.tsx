import { Outlet } from '@umijs/max';
import { App } from 'antd';
import React from 'react';

const Layout: React.FC = () => {
  return (
    <App>
      <Outlet />
    </App>
  );
};

export default Layout;
