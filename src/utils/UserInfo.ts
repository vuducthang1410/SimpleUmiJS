import { User } from "@/types/User";

export function getUserInfoInLocalStorage() {
  const storedUser = localStorage.getItem('user');
  const userData: User | null = storedUser ? (JSON.parse(storedUser) as User) : null;
  return userData;
}
