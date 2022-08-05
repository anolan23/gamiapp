import Image from 'next/image';
import dayjs from 'dayjs';
import { Event } from '../../hooks/useEvents';
import { toDateTimeString } from '../../lib/helpers';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  event: Event;
}

function EventComponent({ event, onClick }: Props) {
  const kmToMileRatio = 0.000621371;

  return (
    <div onClick={onClick} className="event">
      <div className="event__image">
        <Image
          className="event__image__img"
          src={event.image || event.game?.thumb_url || '/event.jpeg'}
          alt="event"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="event__text">
        <span className="event__text__title">{event.title}</span>
        <span className="event__text__game">{event.game?.name}</span>
        <div className="event__text__info">
          <div className="event__text__info__attributes">
            <div className="event__text__info__attribute">
              <span className="material-icons event__text__icon">event</span>
              <span className="event__text__info__text">{`${dayjs(
                event.starts_at
              ).format('dddd, MMM D')}`}</span>
            </div>
            <div className="event__text__info__attribute">
              <span className="material-icons event__text__icon">
                location_on
              </span>
              {event.distance ? (
                <span className="event__text__info__text">{`${(
                  event.distance * kmToMileRatio
                ).toFixed(1)} miles`}</span>
              ) : null}
            </div>
          </div>
          <div className="event__text__attendees">
            <span className="material-icons event__text__icon">people</span>
            <span>5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventComponent;
