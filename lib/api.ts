import backend from './backend';
import { Event } from '../hooks/useEvents';

export async function createEvent(event: Event) {
  try {
    const created = await backend.post<Event>('/api/events', event);
    return created.data;
  } catch (error) {
    throw error;
  }
}

export async function updateEvent(id: number, cols: any) {
  try {
    const created = await backend.patch<Event>(`/api/events/${id}`, cols);
    return created.data;
  } catch (error) {
    throw error;
  }
}
