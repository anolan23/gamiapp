import Link from 'next/link';
import UserToggle from '../../components/UserToggle';

interface Props {
  children?: React.ReactNode;
}

function Sidebar({ children }: Props) {
  return <aside className="sidebar">{children}</aside>;
}
export default Sidebar;
