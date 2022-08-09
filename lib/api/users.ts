import backend from '../backend';
import { User } from '../../hooks/useUser';

export async function findOneById(id: number) {
  try {
    const user = await backend.get<User>(`/api/users/${id}`);
    return user.data;
  } catch (error) {
    throw error;
  }
}
