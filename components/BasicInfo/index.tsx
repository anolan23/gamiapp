import { useFormik } from 'formik';
import Link from 'next/link';
import { Event } from '../../hooks/useEvents';

import FormSection from '../FormSection';
import InputGroup from '../InputGroup';

export interface BasicInfoValues {
  title: string;
  gameId: string;
  address: string;
  startsAt: string;
  endsAt: string;
}

interface Props {
  onSubmit: (values: BasicInfoValues) => any;
  event: Event;
}

function BasicInfo({ onSubmit }: Props) {
  const initialValues: BasicInfoValues = {
    title: '',
    gameId: '',
    address: '',
    startsAt: '',
    endsAt: '',
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
  });
  return (
    <form id="basic-info" onSubmit={formik.handleSubmit} className="basic-info">
      <FormSection
        title="Basic Info"
        description="Name your event and tell gamers what game will be played. Add
            details that highlight what makes it unique."
        icon="segment"
      >
        <InputGroup
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          label="Event title"
          placeholder="Be clear and descriptive"
        />
        <InputGroup
          name="gameId"
          value={formik.values.gameId}
          onChange={formik.handleChange}
          label="Featured game"
          placeholder="Search games"
        />
        <span>
          Need game ideas?{' '}
          <Link href="/" passHref>
            <a className="link">Browse games by category</a>
          </Link>
        </span>
      </FormSection>
      <FormSection
        title="Location"
        description="Help gamers in the area discover your event and let attendees know where to show up."
        icon="map"
      >
        <InputGroup
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          label="Venue location"
          placeholder="Search for a venue or address"
        />
      </FormSection>
      <FormSection
        title="Date and time"
        description="Tell gamers when your event starts and ends so they can make plans to attend."
        icon="date_range"
      >
        <InputGroup
          name="startsAt"
          value={formik.values.startsAt}
          onChange={formik.handleChange}
          label="Event starts"
          placeholder="Search for a venue or address"
          type="datetime-local"
          // icon="calendar_today"
        />
        <InputGroup
          name="endsAt"
          value={formik.values.endsAt}
          onChange={formik.handleChange}
          label="Event ends"
          placeholder="Search for a venue or address"
          type="datetime-local"
          // icon="calendar_today"
        />
      </FormSection>
    </form>
  );
}

export default BasicInfo;
