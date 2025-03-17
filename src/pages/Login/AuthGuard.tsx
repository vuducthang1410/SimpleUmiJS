import { getUserInfoInLocalStorage } from '@/utils/UserInfo';
import { history, Outlet, useDispatch, useLocation, useSelector } from '@umijs/max';
import React, { useEffect } from 'react';
const AuthGuard: React.FC<{ children: JSX.Element }> = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {user}=useSelector((state:any)=>state.auth)
  useEffect(() => {
    const userLocal = getUserInfoInLocalStorage();
    if (userLocal == null || userLocal.isLogin == false) {
      if(location.pathname!=='/logout')
      localStorage.setItem('pathname', location.pathname);
      history.push('/login');
    }
    if(user==undefined)
    if (userLocal?.isLogin == true)
      dispatch({
        type: 'auth/setUserDataWhenReload',
        payload: {
          user: userLocal,
        }
      });
  }, []);

  return <Outlet></Outlet>;
};

export default AuthGuard;
