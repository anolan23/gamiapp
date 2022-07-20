import { useRouter } from 'next/router';
import Link from 'next/link';

import Sidebar from '../../layouts/Sidebar';
import DropdownButton from '../DropdownButton';
import DropdownItem from '../DropdownItem';
import Step from '../Step';

function SidebarManage() {
  const router = useRouter();
  const parts = router.pathname.split('/');
  const match = parts[parts.length - 1];
  console.log(match);

  return (
    <Sidebar>
      <button onClick={() => router.push('/')} className="sidebar-manage__back">
        <span className="material-icons sidebar-manage__back__icon">
          chevron_left
        </span>
        <span className="sidebar-manage__back__text">Events</span>
      </button>
      <div className="sidebar-manage__details">
        <DropdownButton text="Draft" color="secondary" openTo="right">
          <DropdownItem icon="menu_book">Publish now</DropdownItem>
        </DropdownButton>
        <span className="sidebar-manage__details__title">Halo 3 LAN Party</span>
        <span className="sidebar-manage__details__date">
          Sun, Aug 28, 2022 7:00 PM
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
          href="/manage/events/12/basic-info"
          step={1}
          main="Basic Info"
          complete
          active={match === 'basic-info'}
        />
        <Step
          href="/manage/events/12/details"
          step={2}
          main="Details"
          active={match === 'details'}
        />
        <Step
          href="/manage/events/12/publish"
          step={3}
          main="Publish"
          active={match === 'publish'}
        />
      </div>
    </Sidebar>
  );
}

export default SidebarManage;
