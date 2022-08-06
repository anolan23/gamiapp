import { User } from '../../hooks/useUser';
import Card from '../../layouts/Card';
import Avatar from '../Avatar';

interface Props {
  user: User;
}

function Attendee({ user }: Props) {
  const fullName =
    user.first_name && user.last_name
      ? `${user.first_name} ${user.last_name?.charAt(0)}.`
      : `Full N.`;
  return (
    <Card>
      <div className="attendee">
        <Avatar />
        <span className="attendee__name">{fullName}</span>
        <span className="attendee__role">Gamer</span>
      </div>
    </Card>
  );
}
export default Attendee;
