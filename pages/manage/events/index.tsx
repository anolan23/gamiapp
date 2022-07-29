import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import ButtonLink from '../../../components/ButtonLink';
import Dropdown from '../../../components/Dropdown';
import DropdownItem from '../../../components/DropdownItem';
import useBackend from '../../../hooks/useBackend';
import { Event } from '../../../hooks/useEvents';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
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
          <ButtonLink
            href="/manage/events/create"
            text="Create event"
            size="small"
            icon="add"
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
  const [show, setShow] = useState<boolean>(false);
  const actionRef = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback(() => {
    setShow(false);
  }, []);

  useOutsideClick(actionRef, onClickOutside);
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
      <div className="manage-events__event__content">
        <div className="manage-events__event__content__info">
          <span className="manage-events__event__title">{event.title}</span>
          <span className="manage-events__event__text">
            {event.address.split(',').slice(0, -1).join(',')}
          </span>
          <span className="manage-events__event__text">
            Sunday, August 28, 2022 at 7:00 PM CDT
          </span>
        </div>
        <div>
          <div
            onClick={() => setShow(!show)}
            ref={actionRef}
            className="manage-events__event__content__action"
          >
            <span className="material-icons manage-events__event__icon">
              more_horiz
            </span>
            <Dropdown show={show}>
              <DropdownItem href={`/events/${event.id}`}>View</DropdownItem>
              <DropdownItem href={`/manage/events/${event.id}/basic-info`}>
                Edit
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageEvents;
