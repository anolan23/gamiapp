import { useEffect, useState } from 'react';
import backend from '../lib/backend';

export interface Event {
  id?: number;
  created_at?: string;
  updated_at?: string;
  user_id: number;
  game_id: number;
  title: string;
  summary?: string;
  starts_at: string;
  ends_at?: string;
  address: string;
  image?: string;
  player_count?: number;
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
