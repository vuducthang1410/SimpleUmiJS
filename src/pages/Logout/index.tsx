import { useModel } from "@umijs/max";
import { useEffect } from "react";
import { history } from "@umijs/max";

const Logout: React.FC = () => {
    const { setInitialState } = useModel("@@initialState");

    useEffect(() => {
        localStorage.removeItem("user");
        setInitialState({ currentUser: undefined });
        history.push("/login");
    }, []);

    return null;
};

export default Logout;
