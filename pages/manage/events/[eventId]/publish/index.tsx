import Link from 'next/link';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import Navbar from '../../../../../layouts/Navbar';
import Button from '../../../../../components/Button';
import Publish, { PublishValues } from '../../../../../components/Publish';
import Page from '../../../../../layouts/Page';
import Banner from '../../../../../layouts/Banner';
import useUser from '../../../../../hooks/useUser';
import SidebarManage from '../../../../../components/SidebarManage';
import useBackend from '../../../../../hooks/useBackend';
import { Event } from '../../../../../hooks/useEvents';
import { updateEvent } from '../../../../../lib/api';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../../../../layouts/Layout';

function PublishPage() {
  const { user } = useUser();
  const router = useRouter();
  const { eventId } = router.query;
  const url = eventId ? `/api/events/${eventId}` : undefined;
  const { data: event } = useBackend<Event>(url);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!event) return <h1>loading...</h1>;

  const handleSubmit = async function (values: PublishValues) {
    try {
      if (!event.id) return;
      setIsSubmitting(true);
      const cols = { ...values, published: true };
      await updateEvent(event.id, cols);
      toast('Published successfully', {
        type: 'success',
        style: { backgroundColor: '#3d98ff' },
      });
      await router.push(`/manage/events/${event.id}/invite`);
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
        <Publish
          onSubmit={handleSubmit}
          event={event}
          initialValues={{
            open: event.open || true,
          }}
        />
        <Banner>
          <Button color="secondary" text="Discard" />
          <Button
            type="submit"
            form="publish"
            text={event.published ? 'Save' : 'Publish'}
            loading={isSubmitting}
          />
        </Banner>
      </Layout>
    </Page>
  );
}

export default PublishPage;
