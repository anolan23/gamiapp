import Image from 'next/image';
import { Event } from '../../hooks/useEvents';
import { toDateTimeString } from '../../lib/helpers';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  event: Event;
}

function EventComponent({ event, onClick }: Props) {
  return (
    <div onClick={onClick} className="event">
      <div className="event__image">
        <Image
          src={event.image || '/event.webp'}
          alt="event"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="event__text">
        <span className="event__text__title">{event.title}</span>
        <div className="event__text__info">
          <span className="event__text__datetime">
            {/* Sunday, August 28, 2022 at 7:00 PM CDT */}
            {toDateTimeString(event.starts_at)}
          </span>
          <span className="event__text__location">
            {event.address.split(',').slice(0, -1).join(',')}
          </span>
        </div>
        <div className="event__text__attendees">
          <span className="material-icons">person</span>
          <span className="event__text__attendees__count">-</span>
        </div>
        <span className="event__text__summary">{event.summary}</span>
      </div>
    </div>
  );
}
export default EventComponent;
