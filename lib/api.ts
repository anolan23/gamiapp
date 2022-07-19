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
