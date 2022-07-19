import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';

interface Props {
  show: boolean;
  close: () => void;
  direction?: 'up' | 'down';
}

function Dropdown({ show, close, direction = 'down' }: Props) {
  const { logout } = useAuth();
  const router = useRouter();
  if (!show) return null;
  return (
    <div className={`dropdown ${direction === 'up' ? 'dropdown--up' : ''}`}>
      <div className="dropdown__item" onClick={() => {}}>
        <span className="material-icons">account_circle</span>
        <span className="dropdown__item__text">My Profile</span>
      </div>
      <div className="dropdown__item" onClick={async () => {}}>
        <span className="material-icons">group</span>
        <span className="dropdown__item__text">Group Chat</span>
      </div>
      <div className="dropdown__divide"></div>
      <div
        className="dropdown__item dropdown__item--main"
        onClick={async () => {
          try {
            await logout();
            router.push('/login');
          } catch (error) {}
        }}
      >
        <span className="material-icons">logout</span>
        <span className="dropdown__item__text">Logout</span>
      </div>
    </div>
  );
}

export default Dropdown;
