import { useRouter } from 'next/router';
import Link from 'next/link';

import Sidebar from '../../layouts/Sidebar';
import DropdownButton from '../DropdownButton';
import Item from '../Item';
import Step from '../Step';
import { Event } from '../../hooks/useEvents';
import { toDateTimeString } from '../../lib/helpers';
import ItemLink from '../ItemLink';

interface Props {
  event: Event;
}

function SidebarManage({ event }: Props) {
  const router = useRouter();
  const parts = router.pathname.split('/');
  const match = parts[parts.length - 1];

  return (
    <Sidebar>
      <Link href={'/manage/events'}>
        <a className="sidebar-manage__back">
          <span className="material-icons sidebar-manage__back__icon">
            chevron_left
          </span>
          <span className="sidebar-manage__back__text">Events</span>
        </a>
      </Link>
      <div className="sidebar-manage__details">
        <DropdownButton
          text={event.published ? 'Live' : 'Draft'}
          color="primary"
          openTo="right"
          size="small"
        >
          <Item icon="menu_book">Publish now</Item>
        </DropdownButton>
        <span className="sidebar-manage__details__title">{event.title}</span>
        <span className="sidebar-manage__details__date">
          {toDateTimeString(event.starts_at)}
        </span>
        <Link href={`/events/${event.id}`} passHref>
          <a className="sidebar-manage__details__preview">
            <span className="sidebar-manage__details__preview__text">
              View your event
            </span>
            <span className="material-icons sidebar-manage__details__preview__icon">
              open_in_new
            </span>
          </a>
        </Link>
      </div>
      <div className="sidebar-manage__steps">
        <Step
          href={`/manage/events/${event.id}/basic-info`}
          step={1}
          main="Basic Info"
          complete
          active={match === 'basic-info'}
        />
        <Step
          href={`/manage/events/${event.id}/details`}
          step={2}
          main="Details"
          active={match === 'details'}
        />
        <Step
          href={`/manage/events/${event.id}/publish`}
          step={3}
          main="Publish"
          active={match === 'publish'}
        />
      </div>
      <ItemLink
        href={`/manage/events/${event.id}/invite`}
        className="sidebar-manage__item"
      >
        Invite
      </ItemLink>
    </Sidebar>
  );
}

export default SidebarManage;
