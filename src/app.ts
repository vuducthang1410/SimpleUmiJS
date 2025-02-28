import { User } from './types/User';

export async function getInitialState(): Promise<{ currentUser?: User }> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return { currentUser: user };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};
