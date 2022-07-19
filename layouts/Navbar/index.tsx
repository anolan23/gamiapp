import Link from 'next/link';
import UserToggle from '../../components/UserToggle';

interface Props {
  children?: React.ReactNode;
}

function Navbar({ children }: Props) {
  return (
    <nav className="navbar">
      <Link href="/explore" passHref>
        <a className="logo">
          Gami
          <span className="logo--green">app</span>
        </a>
      </Link>
      <div className="navbar__right">
        {children}
        <UserToggle />
      </div>
    </nav>
  );
}
export default Navbar;
