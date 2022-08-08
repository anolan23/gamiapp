import { Form, Formik, FormikErrors, useFormik } from 'formik';
import { Event } from '../../hooks/useEvents';

import FormSection from '../FormSection';
import InputGroup from '../InputGroup';

export interface DetailsValues {
  summary: string;
}

interface Props {
  initialValues?: DetailsValues;
  onSubmit: (values: DetailsValues) => any;
}

function Details({ initialValues: initialVals, onSubmit }: Props) {
  const initialValues: DetailsValues = initialVals || {
    summary: '',
  };

  const validate = (values: DetailsValues) => {
    const errors: FormikErrors<DetailsValues> = {};
    if (!values.summary) {
      errors.summary = 'Required';
    }
    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form id="details" className="details">
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
              value={values.summary}
              onChange={handleChange}
              label="Summary"
              placeholder="Write a short event summary to get attendees excited"
              error={
                errors.summary && touched.summary ? errors.summary : undefined
              }
            />
          </FormSection>
        </Form>
      )}
    </Formik>
  );
}

export default Details;
