import { history } from "@umijs/max";
import React, { useEffect, useState } from "react";

const AuthGuard: React.FC<{ children: JSX.Element }> = ({ children }) => {
    // const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    // useEffect(() => {
    //     const token = localStorage.getItem("token");

    //     if (!token) {
    //         history.replace("/login"); // Sử dụng replace thay vì push để tránh loop vô hạn
    //     } else {
    //         setIsAuthenticated(true);
    //     }
    // }, []);

    // if (isAuthenticated === null) {
    //     return <div>Loading...</div>; // Hiển thị Loading để tránh màn hình trắng
    // }

    return <div style={{ width: "1000px", height: "100px" }}>{children}</div>;
};

export default AuthGuard;
