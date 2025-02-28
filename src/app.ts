import { User } from './types/User';

export async function getInitialState(): Promise<{
  currentUser?: User | null;
}> {
  const user = localStorage.getItem('user');
  return { currentUser: user ? JSON.parse(user) : null };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};
