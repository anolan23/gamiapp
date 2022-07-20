import Link from 'next/link';
import UserToggle from '../../components/UserToggle';

interface Props {
  children?: React.ReactNode;
}

function Sidebar({ children }: Props) {
  return <div className="sidebar">{children}</div>;
}
export default Sidebar;
