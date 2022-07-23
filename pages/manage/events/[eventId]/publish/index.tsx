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
import ManagerDashboard from '../../../../../components/ManagerDashboard';
import useBackend from '../../../../../hooks/useBackend';
import { Event } from '../../../../../hooks/useEvents';
import { updateEvent } from '../../../../../lib/api';

function PublishPage() {
  const { user } = useUser();
  const router = useRouter();
  const { eventId } = router.query;
  const url = eventId ? `/api/events/${eventId}` : null;
  const { data: event } = useBackend<Event>(url);

  if (!event) return <h1>loading...</h1>;

  const handleSubmit = async function (values: PublishValues) {
    try {
      if (!event.id) return;
      const cols = { ...values, published: true };
      await updateEvent(event.id, cols);
      router.push(`/events/${event.id}`);
    } catch (error) {}
  };

  return (
    <Page>
      <Navbar></Navbar>
      <ManagerDashboard event={event}>
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
          />
        </Banner>
      </ManagerDashboard>
    </Page>
  );
}

export default PublishPage;
