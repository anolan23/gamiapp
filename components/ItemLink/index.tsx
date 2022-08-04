import Link from 'next/link';
import { getStaticProps } from '../../pages/events/[id]';
import Item, { ItemProps } from '../Item';

interface Props extends ItemProps {
  href: string;
}

function ItemLink({ href, children, ...props }: Props) {
  return (
    <Link href={href} passHref>
      <a className="item-link">
        <Item {...props}>{children}</Item>
      </a>
    </Link>
  );
}

export default ItemLink;
