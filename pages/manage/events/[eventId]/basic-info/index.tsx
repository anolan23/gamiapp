import { useRouter } from 'next/router';

import Navbar from '../../../../../layouts/Navbar';
import Button from '../../../../../components/Button';
import Page from '../../../../../layouts/Page';
import Banner from '../../../../../layouts/Banner';
import useUser from '../../../../../hooks/useUser';
import BasicInfo, {
  BasicInfoValues,
} from '../../../../../components/BasicInfo';
import ManagerDashboard from '../../../../../components/ManagerDashboard';
import useBackend from '../../../../../hooks/useBackend';
import { Event } from '../../../../../hooks/useEvents';
import { updateEvent } from '../../../../../lib/api';

function BasicInfoPage() {
  const { user } = useUser();
  const router = useRouter();
  const { eventId } = router.query;
  const url = eventId ? `/api/events/${eventId}` : undefined;
  const { data: event } = useBackend<Event>(url);

  if (!event) return <h1>loading...</h1>;

  const toDatetimeLocal = (dateString: string): string => {
    return new Date(dateString).toISOString().slice(0, 16);
  };

  const handleSubmit = async function (values: BasicInfoValues) {
    try {
      if (!event.id) return;
      const coords = JSON.parse(values.coords);
      const [long, lat] = coords;
      const updates: any = {
        ...values,
        location: coords ? `POINT(${long} ${lat})` : undefined,
      };
      delete updates['coords'];
      await updateEvent(event.id, updates);
      router.push(`/manage/events/${event.id}/details`);
    } catch (error) {}
  };

  return (
    <Page>
      <Navbar></Navbar>
      <ManagerDashboard event={event}>
        <BasicInfo
          event={event}
          onSubmit={handleSubmit}
          initialValues={{
            title: event.title,
            game: event.game || { name: '' },
            address: event.address,
            starts_at: toDatetimeLocal(event.starts_at),
            ends_at: event.ends_at ? toDatetimeLocal(event.ends_at) : '',
            coords: JSON.stringify(event.coords),
          }}
        />
        <Banner>
          <Button color="secondary" text="Discard" />
          <Button type="submit" form="basic-info" text="Save & Continue" />
        </Banner>
      </ManagerDashboard>
    </Page>
  );
}

export default BasicInfoPage;
