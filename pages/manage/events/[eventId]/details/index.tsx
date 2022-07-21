import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import Navbar from '../../../../../layouts/Navbar';
import Button from '../../../../../components/Button';
import Details, { DetailsValues } from '../../../../../components/Details';
import Page from '../../../../../layouts/Page';
import Banner from '../../../../../layouts/Banner';
import useUser from '../../../../../hooks/useUser';
import ManagerDashboard from '../../../../../components/ManagerDashboard';
import useBackend from '../../../../../hooks/useBackend';
import { Event } from '../../../../../hooks/useEvents';
import { updateEvent } from '../../../../../lib/api';

function DetailsPage() {
  const { user } = useUser();
  const router = useRouter();
  const { eventId } = router.query;
  const url = eventId ? `/api/events/${eventId}` : null;
  const { data: event } = useBackend<Event>(url);

  if (!event) return <h1>loading...</h1>;

  const onSubmit = async function (values: DetailsValues) {
    try {
      await updateEvent(event.id, values);
      router.push(`/manage/events/${event.id}/publish`);
    } catch (error) {}
  };

  return (
    <Page className="details">
      <Navbar></Navbar>
      <ManagerDashboard event={event}>
        <Details
          onSubmit={onSubmit}
          event={event}
          initialValues={{
            summary: event.summary ?? '',
          }}
        />
      </ManagerDashboard>
      <Banner>
        <Button color="secondary" text="Discard" />
        <Button type="submit" form="details" text="Save & Continue" />
      </Banner>
    </Page>
  );
}

export default DetailsPage;
