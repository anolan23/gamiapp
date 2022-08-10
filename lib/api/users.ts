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

export async function update(id: number, cols: any) {
  try {
    const updated = await backend.patch<User>(`/api/users/${id}`, cols);
    return updated.data;
  } catch (error) {
    throw error;
  }
}
