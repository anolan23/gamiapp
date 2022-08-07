import { User } from '../../hooks/useUser';
import Card from '../../layouts/Card';
import Avatar from '../Avatar';

interface Props {
  user: User;
  role: string;
}

function Attendee({ user, role }: Props) {
  const fullName =
    user.first_name && user.last_name
      ? `${user.first_name} ${user.last_name?.charAt(0)}.`
      : null;
  return (
    <Card>
      <div className="attendee">
        <Avatar height={75} width={75} />
        <span className="attendee__name">{fullName || user.email}</span>
        <span className="attendee__role">{role}</span>
      </div>
    </Card>
  );
}
export default Attendee;
