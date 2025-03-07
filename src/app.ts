import { User } from './types/User';
export async function getInitialState(): Promise<{
  currentUser?: User | null;
}> {
  const user = localStorage.getItem('user');
  return { currentUser: user ? JSON.parse(user) : null };
}

export const layout = () => {
  return {
    logo: 'https://www.saokim.com.vn/wp-content/uploads/2023/01/Bieu-Tuong-Logo-Ngan-Hang-Kien-Long-Bank.png',
    menu: {
      locale: false,
    },
  };
};
