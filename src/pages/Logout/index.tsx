import { history, useDispatch, useModel, useSelector } from '@umijs/max';
import { useEffect } from 'react';

const Logout: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  useEffect(() => {
    console.log('Logout useEffect triggered', user);
    if (user && user.isLogin) {
      console.log('Gọi logout action');
      dispatch({ type: 'auth/logout' });
      setInitialState({ currentUser: undefined });
    }
    history.push('/login');
  }, [user, dispatch, setInitialState]);

  return null;
};

export default Logout;
