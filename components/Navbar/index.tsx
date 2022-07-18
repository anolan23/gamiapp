import UserToggle from '../UserToggle';

interface Props {
  children?: React.ReactNode;
}

function Navbar({ children }: Props) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        Gami<span className="navbar__logo--green">app</span>
      </div>
      <div className="navbar__right">
        {children}
        <UserToggle />
      </div>
    </nav>
  );
}
export default Navbar;
