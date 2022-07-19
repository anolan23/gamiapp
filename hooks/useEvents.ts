import { useEffect, useState } from 'react';
import backend from '../lib/backend';

export interface Event {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  userId: number;
  gameId: number;
  title: string;
  summary?: string;
  startsAt: string;
  endsAt?: string;
  address: string;
  image?: string;
  playerCount?: number;
}

function useEvents() {
  const [events, setEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    find();
  }, []);

  async function find() {
    try {
      const events = await backend.get<Event[]>('/api/events');
      setEvents(events.data);
    } catch (error) {
      throw error;
    }
  }

  return { events, find };
}

export default useEvents;
