export default function access(initialState: { currentUser?: User | null }) {
  const { currentUser } = initialState || { currentUser: null };

  return {
    isAdmin: currentUser?.role === 'admin',
    isManager: currentUser?.role === 'manager',
    isAdminOrManager:
      currentUser?.role === 'admin' || currentUser?.role === 'manager',
  };
}
