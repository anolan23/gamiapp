import Image from 'next/image';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import ButtonLink from '../../../components/ButtonLink';
import Dropdown from '../../../components/Dropdown';
import Item from '../../../components/Item';
import ItemLink from '../../../components/ItemLink';
import { Event } from '../../../hooks/useEvents';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import useUser from '../../../hooks/useUser';
import Card from '../../../layouts/Card';
import Navbar from '../../../layouts/Navbar';
import Page from '../../../layouts/Page';
import { destroy } from '../../../lib/api/events';
import Layout from '../../../layouts/Layout';
import { buildImageUrl } from '../../../lib/bucket';
import Tabs from '../../../components/Tabs';
import useBackendSWR from '../../../hooks/useBackendSWR';

function ManageEvents() {
  const { user } = useUser();
  const router = useRouter();
  const url = user ? `/api/users/${user.id}/events` : undefined;
  const { data: events, mutate } = useBackendSWR<Event[]>(url);

  const handleTabClick = function (tab: string) {
    console.log(tab);
  };

  const renderEvents = function () {
    if (!events) return null;
    if (!events.length) return <h2>No events</h2>;
    return events.map((event, index) => {
      return (
        <EventComponent key={index} event={event} onDeleteClick={mutate} />
      );
    });
  };
  return (
    <Page>
      <Layout navbar={<Navbar />}>
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
          <Tabs tabs={['Attending', 'Hosting']}>
            {({ active }) => (
              <div className="manage-events__events">{renderEvents()}</div>
            )}
          </Tabs>
        </div>
      </Layout>
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
  const src = event.image ? buildImageUrl(event.image) : undefined;

  const onClickOutside = useCallback(() => {
    setShow(false);
  }, []);

  useOutsideClick(actionRef, onClickOutside);

  const handleDeleteClick = async function () {
    try {
      if (!event.id) return;
      await destroy(event.id);
      toast('Event deleted', {
        type: 'success',
        style: { backgroundColor: '#3d98ff' },
      });
      onDeleteClick();
    } catch (error: any) {
      toast(error.message, {
        type: 'error',
      });
    }
  };

  return (
    <Card className="manage-events__event">
      <div className="manage-events__event__image">
        <Image
          src={src || event.game?.thumb_url || '/event.jpeg'}
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
