import Link from 'next/link';
import { User } from '../../hooks/useUser';
import Card from '../../layouts/Card';
import Avatar from '../Avatar';

interface Props {
  user: User;
  role: string;
}

function Attendee({ user, role }: Props) {
  return (
    <Card>
      <Link href={`/profiles/${user.id}`} passHref>
        <a className="attendee">
          <Avatar height={75} width={75} objectKey={user.image} />
          <span className="attendee__name">{user.name || user.email}</span>
          <span className="attendee__role">{role}</span>
        </a>
      </Link>
    </Card>
  );
}
export default Attendee;
