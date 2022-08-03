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
      </div>
    </div>
  );
}
export default EventComponent;
