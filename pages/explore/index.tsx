import dynamic from 'next/dynamic';

import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import Event from '../../components/Event';
import Input from '../../components/Input';

function Explore() {
  const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
    ssr: false,
  });
  return (
    <div className="explore">
      <Navbar>
        <Button color="primary">Create event</Button>
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
            <Button>Search</Button>
          </div>
          <div className="explore__events">
            <Event
              event={{
                image: '/event.webp',
                title: 'Halo LAN party',

                game: 'Halo 3',
                attendees: 7,
                date: new Date(),
              }}
            />
            <Event
              event={{
                image: '/event.webp',
                title: 'Halo LAN party',

                game: 'Halo 3',
                attendees: 7,
                date: new Date(),
              }}
            />
            <Event
              event={{
                image: '/event.webp',
                title: 'Halo LAN party',

                game: 'Halo 3',
                attendees: 7,
                date: new Date(),
              }}
            />
            <Event
              event={{
                image: '/event.webp',
                title: 'Halo LAN party',

                game: 'Halo 3',
                attendees: 7,
                date: new Date(),
              }}
            />
            <Event
              event={{
                image: '/event.webp',
                title: 'Halo LAN party',

                game: 'Halo 3',
                attendees: 7,
                date: new Date(),
              }}
            />
            <Event
              event={{
                image: '/event.webp',
                title: 'Halo LAN party',

                game: 'Halo 3',
                attendees: 7,
                date: new Date(),
              }}
            />
          </div>
        </main>
        <div className="explore__map">
          <MapWithNoSSR />
        </div>
      </div>
    </div>
  );
}

export default Explore;
