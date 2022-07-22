import { useRouter } from 'next/router';
import Link from 'next/link';

import Sidebar from '../../layouts/Sidebar';
import DropdownButton from '../DropdownButton';
import DropdownItem from '../DropdownItem';
import Step from '../Step';
import { Event } from '../../hooks/useEvents';
import { toDateTimeString } from '../../lib/helpers';

interface Props {
  event: Event;
}

function SidebarManage({ event }: Props) {
  const router = useRouter();
  const parts = router.pathname.split('/');
  const match = parts[parts.length - 1];

  return (
    <Sidebar>
      <button onClick={() => router.push('/')} className="sidebar-manage__back">
        <span className="material-icons sidebar-manage__back__icon">
          chevron_left
        </span>
        <span className="sidebar-manage__back__text">Events</span>
      </button>
      <div className="sidebar-manage__details">
        <DropdownButton
          text={event.published ? 'Live' : 'Draft'}
          color="primary"
          openTo="right"
          size="small"
        >
          <DropdownItem icon="menu_book">Publish now</DropdownItem>
        </DropdownButton>
        <span className="sidebar-manage__details__title">{event.title}</span>
        <span className="sidebar-manage__details__date">
          {toDateTimeString(event.starts_at)}
        </span>
        <Link href="/" passHref>
          <a className="sidebar-manage__details__preview">
            <span className="sidebar-manage__details__preview__text">
              Preview your event
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
    </Sidebar>
  );
}

export default SidebarManage;
