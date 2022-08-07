import { useFormik } from 'formik';
import { Event } from '../../hooks/useEvents';
import EventComponent from '../Event';

import FormSection from '../FormSection';
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
      <FormSection title="Publish Your Event" icon="menu_book">
        <div className="publish__event">
          <EventComponent event={event} />
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
            sub="Only available to those with the link"
            name="open"
            id="private"
            onChange={handleChange}
            value="false"
            checked={!formik.values.open}
          />
        </RadioGroup>
      </FormSection>
    </form>
  );
}

export default Publish;
