import { Form, Formik, FormikErrors, useFormik } from 'formik';
import { Event } from '../../hooks/useEvents';

import FormSection from '../FormSection';
import InputGroup from '../InputGroup';
import MaterialIcon from '../MaterialIcon';
import TextArea from '../TextArea';
import bucket, { buildImageUrl } from '../../lib/bucket';
import { updateEvent } from '../../lib/api';
import { toast } from 'react-toastify';
import Image from 'next/image';
import ButtonUpload from '../ButtonUpload';
import Button from '../Button';
import { useSWRConfig } from 'swr';

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
  const { mutate } = useSWRConfig();

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

  const handleUpload = async function (file: File) {
    try {
      if (!event.id) return;
      const image = await bucket.uploadViaPresignedPost({
        resource: 'events',
        resourceId: event.id,
        file,
      });
      await updateEvent(event.id, { image });
      await mutate(`/api/events/${event.id}`);
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

  const handleRemoveClick = async function () {
    try {
      if (!event.image) throw new Error('No image to delete');
      if (!event.id) throw new Error('No event associated with this image');
      await bucket.deleteImage({
        resource: 'events',
        resourceId: event.id,
        key: event.image,
      });
      await updateEvent(event.id, { image: null });
      await mutate(`/api/events/${event.id}`);
      toast('Image removed', {
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

  const renderEventImage = function () {
    if (!event.image) {
      return (
        <MaterialIcon
          className="details__upload__icon"
          icon="add_photo_alternate"
          size={80}
          filled
        />
      );
    }
    const src = buildImageUrl(event.image);
    return <Image src={src} alt="main event" objectFit="cover" layout="fill" />;
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
              <div className="details__upload">
                <div className="details__upload__image-container">
                  {renderEventImage()}
                </div>
                <div className="details__upload__actions">
                  {event.image ? (
                    <Button
                      text="Remove"
                      color="secondary"
                      size="small"
                      onClick={handleRemoveClick}
                      type="button"
                    />
                  ) : null}
                  {!event.image ? (
                    <ButtonUpload
                      text="Upload"
                      size="small"
                      onUpload={handleUpload}
                    />
                  ) : null}
                </div>
              </div>
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
