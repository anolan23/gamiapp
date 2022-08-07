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
import Card from '../../../../../layouts/Card';

function Invite() {
  const { user } = useUser();
  const router = useRouter();
  const { eventId } = router.query;
  const url = eventId ? `/api/events/${eventId}` : undefined;
  const { data: event } = useBackend<Event>(url);

  if (!event) return <h1>loading...</h1>;

  return (
    <Page className="share">
      <Navbar></Navbar>
      <ManagerDashboard event={event}>
        <div className="share__content">
          <h1 className="share__title">Invite</h1>
          <Section title="Event Url">
            <div className="share__link-input">
              <span className="share__link-input__link">
                {`https://gamiapp.com/events/${event.id}`}
              </span>
              <Button
                icon="content_copy"
                text="Copy"
                size="small"
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    `https://gamiapp.com/events/${event.id}`
                  );
                }}
              />
            </div>
          </Section>
          <Section title="Share event">
            <Card>
              <div className="share__social">Socials</div>
            </Card>
          </Section>
        </div>
      </ManagerDashboard>
    </Page>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="share__section">
      <h2 className="share__section__title">{title}</h2>
      {children}
    </section>
  );
}

export default Invite;
