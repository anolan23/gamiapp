import { useState, useRef, useCallback } from 'react';

import Avatar from '../Avatar';
import Dropdown from '../Dropdown';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import useUser from '../../hooks/useUser';
import DropdownItem from '../DropdownItem';
import useAuth from '../../hooks/useAuth';

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

  return (
    <div
      className={`user-toggle ${className || ''}`}
      onClick={() => setShow(!show)}
      ref={toggleRef}
    >
      <Avatar className="user-toggle__image" />
      <span className="user-toggle__name">{user?.email || 'Sign up'}</span>
      <span className="material-icons user-toggle__icon">expand_more</span>
      <Dropdown show={show}>
        <DropdownItem href="/manage/events">Manage my events</DropdownItem>
        <DropdownItem href="/signup" icon="logout" onClick={logout}>
          Logout
        </DropdownItem>
      </Dropdown>
    </div>
  );
}

export default UserToggle;
