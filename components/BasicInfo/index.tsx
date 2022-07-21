import { useFormik } from 'formik';
import Link from 'next/link';
import { Event } from '../../hooks/useEvents';

import FormSection from '../FormSection';
import InputGroup from '../InputGroup';

export interface BasicInfoValues {
  title: string;
  game_id: string;
  address: string;
  starts_at: string;
  ends_at: string;
}

interface Props {
  initialValues?: BasicInfoValues;
  onSubmit: (values: BasicInfoValues) => any;
  event: Event;
}

function BasicInfo({ initialValues, onSubmit, event }: Props) {
  const initValues: BasicInfoValues = initialValues || {
    title: '',
    game_id: '',
    address: '',
    starts_at: '',
    ends_at: '',
  };
  const formik = useFormik({
    initialValues: initValues,
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
          name="game_id"
          value={formik.values.game_id}
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
          name="starts_at"
          value={formik.values.starts_at}
          onChange={formik.handleChange}
          label="Event starts"
          placeholder="Search for a venue or address"
          type="datetime-local"
          // icon="calendar_today"
        />
        <InputGroup
          name="ends_at"
          value={formik.values.ends_at}
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
