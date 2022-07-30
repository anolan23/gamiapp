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
          className="event__image__img"
          src={event.image || event.game?.thumb_url || '/event.jpeg'}
          alt="event"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="event__text">
        <span className="event__text__title">{event.title}</span>
        <span className="event__text__game">{event.game?.name}</span>
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
