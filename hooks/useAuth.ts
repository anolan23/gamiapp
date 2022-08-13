import { useSWRConfig } from 'swr';
import backend from '../lib/backend';

export interface Credentials {
  email: string;
  password: string;
}

function useAuth() {
  const { mutate } = useSWRConfig();

  const signup = async function (credentials: Credentials) {
    try {
      const user = await backend.post('/api/signup', credentials);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const login = async function (credentials: Credentials) {
    try {
      const user = await backend.post('/api/login', credentials);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = async function () {
    try {
      await backend.post('/api/logout');
      await mutate('/api/login', null);
    } catch (error) {
      throw error;
    }
  };

  return { signup, login, logout };
}
export default useAuth;
