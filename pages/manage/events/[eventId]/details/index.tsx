import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import Navbar from '../../../../../layouts/Navbar';
import Button from '../../../../../components/Button';
import Details, { DetailsValues } from '../../../../../components/Details';
import Page from '../../../../../layouts/Page';
import Banner from '../../../../../layouts/Banner';
import useUser from '../../../../../hooks/useUser';
import useBackend from '../../../../../hooks/useBackend';
import { Event } from '../../../../../hooks/useEvents';
import { updateEvent } from '../../../../../lib/api';
import useMapbox from '../../../../../hooks/useMapbox';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../../../../layouts/Layout';
import SidebarManage from '../../../../../components/SidebarManage';

function DetailsPage() {
  const { user } = useUser();
  const router = useRouter();
  const { eventId } = router.query;
  const url = eventId ? `/api/events/${eventId}` : undefined;
  const { data: event } = useBackend<Event>(url);
  const { data, forward } = useMapbox();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!event) return <h1>loading...</h1>;

  const onSubmit = async function (values: DetailsValues) {
    try {
      if (!event.id) return;
      setIsSubmitting(true);
      await updateEvent(event.id, values);
      await router.push(`/manage/events/${event.id}/publish`);
    } catch (error) {
      let message = 'Error';
      if (error instanceof Error) message = error.message;
      toast(message, {
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page>
      <Layout navbar={<Navbar />} sidebar={<SidebarManage event={event} />}>
        <Details
          onSubmit={onSubmit}
          initialValues={{
            summary: event.summary ?? '',
            description: event.description ?? '',
          }}
        />
        <Banner>
          <Button color="secondary" text="Discard" />
          <Button
            type="submit"
            form="details"
            text="Save & Continue"
            loading={isSubmitting}
          />
        </Banner>
      </Layout>
    </Page>
  );
}

export default DetailsPage;
