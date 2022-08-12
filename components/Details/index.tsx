import { Form, Formik, FormikErrors, useFormik } from 'formik';
import { Event } from '../../hooks/useEvents';

import FormSection from '../FormSection';
import InputGroup from '../InputGroup';
import MaterialIcon from '../MaterialIcon';
import TextArea from '../TextArea';
import bucket from '../../lib/bucket';
import { updateEvent } from '../../lib/api';
import { toast } from 'react-toastify';

export interface DetailsValues {
  summary: string;
  description: string;
}

interface Props {
  event: Event;
  initialValues?: DetailsValues;
  onSubmit: (values: DetailsValues) => any;
}

function Details({ initialValues: initialVals, event, onSubmit }: Props) {
  const initialValues: DetailsValues = initialVals || {
    summary: '',
    description: '',
  };

  const validate = (values: DetailsValues) => {
    const errors: FormikErrors<DetailsValues> = {};
    if (!values.summary) {
      errors.summary = 'Required';
    }
    return errors;
  };

  const handleUpload = async function (e: React.ChangeEvent<HTMLInputElement>) {
    try {
      if (!e.target.files) return;
      if (!event.id) return;
      const file = e.target.files[0];
      const image = await bucket.uploadViaPresignedPost({
        resource: 'events',
        resourceId: event.id,
        file,
      });
      await updateEvent(event.id, { image });
      toast('Image uploaded', {
        type: 'success',
        theme: 'colored',
        style: { backgroundColor: '#3d98ff' },
      });
    } catch (error) {
      console.error(error);
      let message = 'Error';
      if (error instanceof Error) message = error.message;
      toast(message, {
        type: 'error',
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ values, handleChange, errors, touched, handleBlur }) => {
        return (
          <Form id="details" className="details">
            <FormSection
              title="Main Event Image"
              description="This is the first image gamers will see at the top of your listing. Use a high quality image: 2160x1080px (2:1 ratio)."
              icon="image"
            >
              <label className="details__upload">
                <MaterialIcon
                  className="details__upload__icon"
                  icon="add_photo_alternate"
                  size={80}
                  filled
                />
                <input
                  hidden
                  id="file-upload"
                  type="file"
                  onChange={handleUpload}
                  accept="image/*"
                />
              </label>
            </FormSection>
            <FormSection
              title="Description"
              description="Add more details to your event."
              icon="segment"
            >
              <InputGroup
                name="summary"
                value={values.summary}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Summary"
                placeholder="Write a short event summary to get attendees excited"
                error={
                  errors.summary && touched.summary ? errors.summary : undefined
                }
              />
              <InputGroup
                Input={TextArea}
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Description"
                placeholder="Describe your game event"
              />
            </FormSection>
          </Form>
        );
      }}
    </Formik>
  );
}

export default Details;
