import Link from 'next/link';
import Button, { ButtonProps } from '../Button';

interface Props extends ButtonProps {
  href: string;
}

function ButtonLink({ href, ...props }: Props) {
  return (
    <Link href={href}>
      <a className="btn-link">
        <Button {...props} />
      </a>
    </Link>
  );
}

export default ButtonLink;
