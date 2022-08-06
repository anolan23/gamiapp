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

export async function attend(event_id: number, user_id: number) {
  try {
    const response = await backend.post(`/api/events/attendees`, {
      event_id,
      user_id,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
