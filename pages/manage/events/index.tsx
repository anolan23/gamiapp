import Image from 'next/image';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ButtonLink from '../../../components/ButtonLink';
import Dropdown from '../../../components/Dropdown';
import Item from '../../../components/Item';
import ItemLink from '../../../components/ItemLink';
import useBackend from '../../../hooks/useBackend';
import { Event } from '../../../hooks/useEvents';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import useUser from '../../../hooks/useUser';
import Card from '../../../layouts/Card';
import Container from '../../../layouts/Container';
import Navbar from '../../../layouts/Navbar';
import Page from '../../../layouts/Page';
import { destroy } from '../../../lib/api/events';

function ManageEvents() {
  const { user } = useUser();
  const router = useRouter();
  const url = user ? `/api/users/${user.id}/events` : undefined;
  const { data: events, mutate } = useBackend<Event[]>(url);

  const renderEvents = function () {
    if (!events) return null;
    return events.map((event, index) => {
      return (
        <EventComponent
          key={index}
          event={event}
          onDeleteClick={() => {
            const filtered = events.filter((ev) => event.id !== ev.id);
            mutate(filtered);
            toast.success('Deleted');
          }}
        />
      );
    });
  };
  return (
    <Page className="manage-events">
      <Navbar></Navbar>
      <Container className="manage-events__container">
        <div className="manage-events__content">
          <div className="manage-events__content__heading">
            <h1 className="manage-events__title">Events</h1>
            <div className="manage-events__action">
              <ButtonLink
                href="/manage/events/create"
                text="Create event"
                size="small"
                icon="add"
              />
            </div>
          </div>
          <div className="manage-events__events">{renderEvents()}</div>
        </div>
      </Container>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{ backgroundColor: '#3d98ff' }}
      />
    </Page>
  );
}

interface EventProps {
  event: Event;
  onDeleteClick: () => void;
}

function EventComponent({ event, onDeleteClick }: EventProps) {
  const [show, setShow] = useState<boolean>(false);
  const actionRef = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback(() => {
    setShow(false);
  }, []);

  useOutsideClick(actionRef, onClickOutside);

  const handleDeleteClick = async function () {
    try {
      if (!event.id) return;
      await destroy(event.id);
      onDeleteClick();
    } catch (error) {}
  };

  return (
    <Card className="manage-events__event">
      <div className="manage-events__event__image">
        <Image
          src={event.image || event.game?.thumb_url || '/event.jpeg'}
          alt="game event"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="manage-events__event__content">
        <div className="manage-events__event__content__info">
          <span className="manage-events__event__title">{event.title}</span>
          <span className="manage-events__event__text">
            {event.address.split(',').slice(0, -1).join(',')}
          </span>
          <span className="manage-events__event__text">
            {dayjs(event.starts_at).format('dddd, MMMM D, YYYY [at] h:mm A')}
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
              <ItemLink href={`/events/${event.id}`} icon="visibility">
                View
              </ItemLink>
              <ItemLink href={`/manage/events/${event.id}/publish`} icon="edit">
                Edit
              </ItemLink>
              <Item icon="delete_outline" onClick={handleDeleteClick}>
                Delete
              </Item>
            </Dropdown>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ManageEvents;
