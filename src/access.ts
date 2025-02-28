import { User } from './types/User';

export default function access(initialState: { currentUser?: User }) {
  const { currentUser } = initialState || {};

  return {
    isAdmin: currentUser?.role === 'admin',
    isManager: currentUser?.role === 'manager',
    isAdminOrManager:
      currentUser?.role === 'admin' || currentUser?.role === 'manager',
  };
}
