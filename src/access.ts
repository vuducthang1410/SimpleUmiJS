import { User } from './types/User';

export default function access(initialState: { currentUser?: User | null }) {
  const { currentUser } = initialState || { currentUser: null };

  return {
    isAdmin: currentUser?.role === 'admin',
    isManager: currentUser?.role === 'manager',
    isUser: currentUser?.role === 'user',
    isAdminOrManager:
      currentUser?.role === 'admin' || currentUser?.role === 'manager',
  };
}
