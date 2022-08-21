import Link from 'next/link';
import { useRouter } from 'next/router';

import Sidebar from '../../layouts/Sidebar';
import ItemLink from '../ItemLink';

function AccountSidebar() {
  const router = useRouter();
  const parts = router.pathname.split('/');
  const match = parts[parts.length - 1];
  return (
    <Sidebar>
      <div className="account-sidebar__items">
        <Item href="/account" icon="person" active={match === 'account'}>
          Edit Profile
        </Item>
        <Item
          href="/account/personal"
          icon="info"
          active={match === 'personal'}
        >
          Personal Info
        </Item>
        <Item
          href="/account/management"
          icon="settings"
          active={match === 'management'}
        >
          Account Management
        </Item>
      </div>
    </Sidebar>
  );
}

interface ItemProps {
  children: React.ReactNode;
  icon?: string;
  href: string;
  active?: boolean;
}
function Item({ active, children, icon, href }: ItemProps) {
  return (
    <Link href={href} passHref>
      <a
        className={`account-sidebar__item ${
          active ? 'account-sidebar__item--active' : ''
        }`}
      >
        <span className="material-icons  account-sidebar__item__icon">
          {icon}
        </span>
        <span className="account-sidebar__item__text">{children}</span>
      </a>
    </Link>
  );
}

export default AccountSidebar;
