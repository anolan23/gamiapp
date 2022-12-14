import { useEffect, useState } from 'react';
import backend from '../lib/backend';
import { Game } from './useGames';
import { Coords } from './useMapbox';
import { User } from './useUser';

export interface Event {
  id?: number;
  created_at?: string;
  updated_at?: string;
  user_id?: number;
  game?: Game;
  title: string;
  summary?: string;
  starts_at: string;
  ends_at?: string;
  address: string;
  coords?: Coords;
  location?: string;
  image?: string;
  attendees?: User[];
  open?: boolean;
  published?: boolean;
  distance?: number;
  host?: User;
  description?: string;
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
