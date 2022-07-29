import Link from 'next/link';

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  icon?: string;
  children: React.ReactNode;
}

function DropdownItem({ href, icon, onClick, onMouseDown, children }: Props) {
  return (
    <Link href={href}>
      <a className="dropdown-item" onClick={onClick} onMouseDown={onMouseDown}>
        <span className="material-icons dropdown-item__icon">{icon}</span>
        <span className="dropdown-item__text">{children}</span>
      </a>
    </Link>
  );
}

export default DropdownItem;
