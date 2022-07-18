import Image from 'next/image';

export interface Event {
  image?: string;
  title: string;
  game: string;
  summary?: string;
  attendees: number;
  date: Date;
}

interface Props {
  event: Event;
}

function EventComponent({ event }: Props) {
  return (
    <div className="event">
      <div className="event__image">
        <Image
          src={event.image || '/event.jpeg'}
          alt="event"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="event__content">
        <div className="event__content__text">
          <span className="event__title">{event.title}</span>
          <span className="event__game">{event.game}</span>
        </div>
        <div className="event__content__bottom">
          <div className="event__content__bottom__date">
            <span className="material-icons">schedule</span>
            <span className="event__content__bottom__date__val">
              {event.date.toLocaleDateString()}
            </span>
          </div>
          <div className="event__content__bottom__attendees">
            <span className="material-icons">person</span>
            <span className="event__content__bottom__attendees__count">
              {event.attendees}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventComponent;
