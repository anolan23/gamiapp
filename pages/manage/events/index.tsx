import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '../../../components/Button';
import useBackend from '../../../hooks/useBackend';
import { Event } from '../../../hooks/useEvents';
import useUser from '../../../hooks/useUser';
import Container from '../../../layouts/Container';
import Navbar from '../../../layouts/Navbar';
import Page from '../../../layouts/Page';

function ManageEvents() {
  const { user } = useUser();
  const router = useRouter();
  const url = user ? `/api/users/${user.id}/events` : undefined;
  const { data: events } = useBackend<Event[]>(url);

  const renderEvents = function () {
    if (!events) return null;
    return events.map((event, index) => {
      return <EventComponent key={index} event={event} />;
    });
  };
  return (
    <Page className="manage-events">
      <Navbar></Navbar>
      <Container className="manage-events__container">
        <h1 className="manage-events__title">Events</h1>
        <div className="manage-events__action">
          <Button
            text="Create event"
            size="small"
            icon="add"
            onClick={() => router.push('/manage/events/create')}
          />
        </div>
        <div className="manage-events__events">{renderEvents()}</div>
      </Container>
    </Page>
  );
}

interface EventProps {
  event: Event;
}

function EventComponent({ event }: EventProps) {
  return (
    <div className="manage-events__event">
      <div className="manage-events__event__image">
        <Image
          src={event.image ?? '/event.jpeg'}
          alt="game event"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="manage-events__event__content"></div>
    </div>
  );
}

export default ManageEvents;
