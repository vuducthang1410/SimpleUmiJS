import { Outlet } from '@umijs/max';
import { App } from 'antd';
import React from 'react';

const Layout: React.FC = () => {
    return (
        <App>
            {/* <header style={{ padding: 10, background: '#ddd' }}>
                <h2>My Custom Layout</h2>
            </header>
            <main style={{ padding: 20 }}> */}
            <Outlet />
            {/* </main>
            <footer style={{ padding: 10, background: '#ddd' }}>
                <p>© 2024 My App</p>
            </footer> */}
        </App>
    );
};

export default Layout;
