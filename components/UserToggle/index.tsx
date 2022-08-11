import { useState, useRef, useCallback } from 'react';

import Avatar from '../Avatar';
import Dropdown from '../Dropdown';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import useUser from '../../hooks/useUser';
import Item from '../Item';
import useAuth from '../../hooks/useAuth';
import ItemLink from '../ItemLink';

interface Props {
  className?: string;
}

function UserToggle({ className }: Props) {
  const { user } = useUser();
  const { logout } = useAuth();
  const [show, setShow] = useState<boolean>(false);
  const toggleRef = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback(() => {
    setShow(false);
  }, []);

  useOutsideClick(toggleRef, onClickOutside);
  if (!user) return null;
  return (
    <div
      className={`user-toggle ${className || ''}`}
      onClick={() => setShow(!show)}
      ref={toggleRef}
    >
      <Avatar className="user-toggle__image" objectKey={user.image} />
      <span className="material-icons user-toggle__icon">expand_more</span>
      <Dropdown show={show}>
        <ItemLink href="/manage/events/create" icon="add">
          Create event
        </ItemLink>
        <ItemLink href="/manage/events">Manage my events</ItemLink>
        <ItemLink href={`/profiles/${user.id}`}>View profile</ItemLink>
        <ItemLink href="/login" icon="logout" onClick={logout}>
          Logout
        </ItemLink>
      </Dropdown>
    </div>
  );
}

export default UserToggle;
