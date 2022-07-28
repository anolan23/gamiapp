import { Coords } from '../../hooks/useMapbox';
import backend from '../backend';
import { coordsToCoordString } from '../helpers';

export async function search(center: Coords, radius: number) {
  try {
    const events = await backend.get<Event>(`/api/events`, {
      params: {
        center: coordsToCoordString(center),
        radius,
      },
    });
    return events.data;
  } catch (error) {
    throw error;
  }
}
