import dynamic from 'next/dynamic';

import Navbar from '../../layouts/Navbar';
import Button from '../../components/Button';
import Event from '../../components/Event';
import Input from '../../components/Input';
import ListRenderer from '../../components/ListRenderer';
import Page from '../../layouts/Page';
import { useRouter } from 'next/router';
import useUser from '../../hooks/useUser';
import useEvents from '../../hooks/useEvents';

function Explore() {
  const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
    ssr: false,
  });
  const user = useUser();
  const { events } = useEvents();
  const router = useRouter();

  return (
    <Page className="explore">
      <Navbar>
        <Button color="primary" onClick={() => router.push('/events/create')}>
          Create event
        </Button>
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
            <ListRenderer
              list={events}
              itemRenderer={(event) => {
                return <Event event={event} />;
              }}
            />
          </div>
        </main>
        <div className="explore__map">
          <MapWithNoSSR />
        </div>
      </div>
    </Page>
  );
}

export default Explore;
