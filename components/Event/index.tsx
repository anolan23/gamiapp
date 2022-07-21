import Image from 'next/image';
import { Event } from '../../hooks/useEvents';

interface Props {
  event: Event;
}

function EventComponent({ event }: Props) {
  return (
    <div className="event">
      <div className="event__image">
        <Image
          src={event.image || '/event.webp'}
          alt="event"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="event__content">
        <div className="event__content__text">
          <span className="event__title">{event.title}</span>
          <span className="event__game">{event.game_id}</span>
        </div>
        <div className="event__content__bottom">
          <div className="event__content__bottom__date">
            <span className="material-icons">schedule</span>
            <span className="event__content__bottom__date__val">
              {event.starts_at}
            </span>
          </div>
          <div className="event__content__bottom__attendees">
            <span className="material-icons">person</span>
            <span className="event__content__bottom__attendees__count">
              {event.player_count}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventComponent;
