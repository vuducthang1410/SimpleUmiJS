export function getUserInfoInLocalStorage() {
  const storedUser = localStorage.getItem('user');
  const userData = storedUser ? JSON.parse(storedUser) : null;
  return userData;
}
