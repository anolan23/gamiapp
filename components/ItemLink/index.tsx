import Link from 'next/link';
import { getStaticProps } from '../../pages/events/[id]';
import DropdownItem, { ItemProps } from '../DropdownItem';

interface Props extends ItemProps {
  href: string;
}

function ItemLink({ href, children, ...props }: Props) {
  return (
    <Link href={href} passHref>
      <a className="dropdown-item-link">
        <DropdownItem {...props}>{children}</DropdownItem>
      </a>
    </Link>
  );
}

export default ItemLink;
