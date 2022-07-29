import dynamic from 'next/dynamic';

import Navbar from '../../layouts/Navbar';
import Button from '../../components/Button';
import EventComponent from '../../components/Event';
import Input from '../../components/Input';
import ListRenderer from '../../components/ListRenderer';
import Page from '../../layouts/Page';
import { useRouter } from 'next/router';
import useUser from '../../hooks/useUser';
import useBackend from '../../hooks/useBackend';
import useLocation from '../../hooks/useLocation';
import { useMemo } from 'react';
import { Event } from '../../hooks/useEvents';
import { MarkerType } from '../../components/Map';
import { Coords } from '../../hooks/useMapbox';
import ButtonLink from '../../components/ButtonLink';

function Explore() {
  const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
    ssr: false,
  });
  const { coords } = useLocation();
  const user = useUser();
  const config = useMemo(() => {
    if (!coords) return null;
    return {
      params: {
        center: `${coords?.longitude},${coords?.latitude}`,
        radius: 5,
      },
    };
  }, [coords]);

  const { data: events } = useBackend<Event[]>(`/api/events`, config);
  const router = useRouter();

  const center: Coords | undefined = coords
    ? [coords.latitude, coords.longitude]
    : undefined;

  const markers = events
    ? events.map((event): MarkerType => {
        const [long, lat] = event.coords!;
        return {
          position: [lat, long],
        };
      })
    : undefined;

  return (
    <Page className="explore">
      <Navbar>
        <ButtonLink
          href="/manage/events/create"
          size="small"
          icon="add"
          text="Create event"
          color="primary"
        />
      </Navbar>
      <div className="explore__content">
        <main className="explore__main">
          <div className="explore__main__filters">
            <div className="explore__main__filters__inputs">
              <Input
                icon="search"
                placeholder="Search anything"
                className="explore__input"
              />
              <Input
                icon="location_on"
                placeholder="Choose a location"
                className="explore__input"
              />
            </div>
            <Button icon="search" text="Search" />
          </div>
          <div className="explore__events">
            <ListRenderer
              list={events}
              itemRenderer={(event: Event, index) => {
                return (
                  <EventComponent
                    key={index}
                    event={event}
                    onClick={() => router.push(`/events/${event.id}`)}
                  />
                );
              }}
            />
          </div>
        </main>
        <div className="explore__map">
          <MapWithNoSSR center={center} markers={markers} />
        </div>
      </div>
    </Page>
  );
}

export default Explore;
