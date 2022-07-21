import { useFormik } from 'formik';
import { Event } from '../../hooks/useEvents';

import FormSection from '../FormSection';
import InputGroup from '../InputGroup';

export interface DetailsValues {
  summary: string;
}

interface Props {
  initialValues?: DetailsValues;
  onSubmit: (values: DetailsValues) => any;
  event: Event;
}

function Details({ initialValues, onSubmit, event }: Props) {
  const initValues: DetailsValues = initialValues || {
    summary: '',
  };
  const formik = useFormik({
    initialValues: initValues,
    onSubmit,
  });
  return (
    <form id="details" onSubmit={formik.handleSubmit}>
      <FormSection
        title="Main Event Image"
        description="This is the first image gamers will see at the top of your listing. Use a high quality image: 2160x1080px (2:1 ratio)."
        icon="image"
      ></FormSection>
      <FormSection
        title="Description"
        description="Add more details to your event."
        icon="segment"
      >
        <InputGroup
          name="summary"
          value={formik.values.summary}
          onChange={formik.handleChange}
          label="Summary"
          placeholder="Write a short event summary to get attendees excited"
        />
      </FormSection>
    </form>
  );
}

export default Details;
