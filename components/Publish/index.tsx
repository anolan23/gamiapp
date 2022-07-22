import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { Event } from '../../hooks/useEvents';

import FormSection from '../FormSection';
import InputGroup from '../InputGroup';
import Radio from '../Radio';
import RadioGroup from '../RadioGroup';

export interface PublishValues {
  open: boolean;
}

interface Props {
  initialValues?: PublishValues;
  onSubmit: (values: PublishValues) => any;
  event: Event;
}

function Publish({ initialValues, onSubmit, event }: Props) {
  const initValues: PublishValues = initialValues || {
    open: true,
  };
  const formik = useFormik({
    initialValues: initValues,
    onSubmit,
  });

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const bool = e.target.value === 'true';
    formik.setFieldValue('open', bool);
  };

  return (
    <form id="publish" onSubmit={formik.handleSubmit} className="publish">
      <div className="publish__container">
        <h1 className="publish__title">Publish Your Event</h1>
        <div className="publish__event">
          <div className="publish__event__image">
            <Image
              src={event.image || '/event.webp'}
              alt="event"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="publish__event__text">
            <span className="publish__event__text__title">{event.title}</span>
            <div className="publish__event__text__info">
              <span className="publish__event__text__datetime">
                Sunday, August 28, 2022 at 7:00 PM CDT
              </span>
              <span className="publish__event__text__location">
                80 West St., Chicago, IL 60605
              </span>
            </div>
            <div className="publish__event__text__attendees">
              <span className="material-icons">person</span>
              <span className="publish__event__text__attendees__count">-</span>
            </div>
            <span className="publish__event__text__summary">
              {event.summary}
            </span>
            <Link href="/" passHref>
              <a className="publish__event__text__preview">
                <span className="publish__event__text__preview__text">
                  Preview
                </span>
                <span className="material-icons publish__event__text__preview__icon">
                  open_in_new
                </span>
              </a>
            </Link>
          </div>
        </div>
        <RadioGroup>
          <h2>Who can see your event?</h2>
          <Radio
            label="Public"
            sub="Shared on Gamiapp and search engines"
            name="open"
            id="public"
            onChange={handleChange}
            value="true"
            checked={formik.values.open}
          />
          <Radio
            label="Private"
            sub="Only available to a selected audience"
            name="open"
            id="private"
            onChange={handleChange}
            value="false"
            checked={!formik.values.open}
          />
        </RadioGroup>
      </div>
    </form>
  );
}

export default Publish;
