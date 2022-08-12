import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import useUser from '../../../hooks/useUser';
import Page from '../../../layouts/Page';
import Navbar from '../../../layouts/Navbar';
import { GetStaticProps } from 'next';
import backend from '../../../lib/backend';
import { ParsedUrlQuery } from 'querystring';
import { Event } from '../../../hooks/useEvents';
import Button from '../../../components/Button';
import { parseAddress } from '../../../lib/helpers';
import useMapbox from '../../../hooks/useMapbox';
import { attend } from '../../../lib/api';
import Attendee from '../../../components/Attendee';
import Card from '../../../layouts/Card';
import Banner from '../../../layouts/Banner';
import { useState } from 'react';
import Layout from '../../../layouts/Layout';
import { buildImageUrl } from '../../../lib/bucket';

interface Props {
  event: Event;
}

function EventPage({ event }: Props) {
  const { user } = useUser();
  const router = useRouter();
  const { getStaticMapUrl } = useMapbox();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (router.isFallback) return <h1>loading...</h1>;

  const src = event.image ? buildImageUrl(event.image) : undefined;
  const { street, city } = parseAddress(event.address);
  const staticMapUrl = event.coords
    ? getStaticMapUrl({
        coords: event.coords,
        width: 400,
        height: 200,
      })
    : undefined;

  const handleAttendClick = async function () {
    try {
      if (!event.id || !user?.id) return;
      setIsSubmitting(true);
      await attend(event.id, user?.id);
      toast('Successfully joined!', {
        type: 'success',
        style: { backgroundColor: '#3d98ff' },
      });
    } catch (error: any) {
      toast(error.message, {
        type: 'error',
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStaticMap = function () {
    if (!staticMapUrl) return null;
    return (
      <Image
        src={staticMapUrl}
        alt="event map"
        layout="fill"
        objectFit="cover"
      />
    );
  };
  const renderAttendees = function () {
    const { attendees } = event;
    if (!attendees) return null;
    return attendees.map((user) => (
      <Attendee
        key={user.id}
        user={user}
        role={`${event.user_id === user.id ? 'Host' : 'Gamer'}`}
      />
    ));
  };

  return (
    <Page>
      <Layout navbar={<Navbar />}>
        <div className="events-page__content">
          <div className="events-page__main">
            <div className="events-page__main__image-container">
              <Image
                src={src || event.game?.image_url || 'event.jpeg'}
                alt="event main"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="events-page__main__title">
              <h1 className="events-page__main__title--main">{event.title}</h1>
              <p className="events-page__main__title--sub">
                {event.summary ?? 'Event summary'}
              </p>
            </div>
            <div className="events-page__main__about">
              <h2 className="events-page__main__about--main">
                About this event
              </h2>
              <p className="events-page__main__about--sub">
                {event.description ?? 'Event description'}
              </p>
            </div>
            <Section
              title="Featured game"
              label="How to play"
              labelHref={event.game?.rules_url}
            >
              <Card className="events-page__featured-game">
                <div className="events-page__featured-game__image">
                  <Image
                    src={event.game?.thumb_url || event.game?.image_url || '/'}
                    alt="game"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="events-page__featured-game__info">
                  <span className="events-page__featured-game__title">
                    {event.game?.name}
                  </span>
                  <Attribute
                    label="Year published"
                    value={event.game?.year_published?.toString()}
                  />
                  <Attribute
                    label="Description"
                    value={event.game?.description_preview}
                  />
                  <Attribute label="Players" value={event.game?.players} />
                  <Attribute
                    label="Average user rating"
                    value={event.game?.average_user_rating?.toString()}
                  />
                </div>
              </Card>
            </Section>
            <Section
              title={`Attendees (${event.attendees?.length || 0})`}
              label="View all"
              labelHref="/"
            >
              <div className="events-page__attendees">{renderAttendees()}</div>
            </Section>
          </div>
          <div className="events-page__side">
            <Card className="events-page__info">
              <div className="events-page__info__details">
                <div className="events-page__info__detail">
                  <span className="material-icons events-page__info__detail__icon">
                    date_range
                  </span>
                  <div className="events-page__info__detail__content">
                    <span className="events-page__info__detail__content__heading">
                      Date and time
                    </span>
                    <time className="events-page__info__detail__content__values">
                      <p>{`${dayjs(event.starts_at).format(
                        'ddd, MMMM D, YYYY'
                      )}`}</p>
                      <p>{`${dayjs(event.starts_at).format('h:mm A')}`}</p>
                    </time>
                  </div>
                  <div></div>
                </div>
                <div className="events-page__info__detail">
                  <span className="material-icons events-page__info__detail__icon">
                    location_on
                  </span>
                  <div className="events-page__info__detail__content">
                    <span className="events-page__info__detail__content__heading">
                      Location
                    </span>
                    <div className="events-page__info__detail__content__values">
                      <p>{street}</p>
                      <p>{city}</p>
                    </div>
                    <Link href="/" passHref>
                      <a className="link">View map</a>
                    </Link>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="events-page__info__map">{renderStaticMap()}</div>
            </Card>
          </div>
        </div>
      </Layout>
      <Banner>
        <Button
          text="Share"
          color="secondary"
          icon="ios_share"
          iconPos="right"
        />
        <Button
          text="Attend"
          onClick={handleAttendClick}
          loading={isSubmitting}
        />
      </Banner>
    </Page>
  );
}

interface SectionProps {
  title: string;
  label: string;
  labelHref?: string;
  children: React.ReactNode;
}

function Section({ title, label, labelHref, children }: SectionProps) {
  return (
    <section className="section">
      <div className="section__heading">
        <h2 className="section__heading__title">{title}</h2>
        {labelHref ? (
          <Link href={labelHref} passHref>
            <a className="link" target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          </Link>
        ) : null}
      </div>
      <div className="section__content">{children}</div>
    </section>
  );
}

interface AttributeProps {
  label: string;
  value?: string;
}

function Attribute({ label, value }: AttributeProps) {
  if (!value) return null;
  return (
    <div className="attribute">
      <span className="attribute--main">{label}</span>
      <span className="attribute--sub">{value}</span>
    </div>
  );
}

type NextProps = {
  event: Event;
};

interface Params extends ParsedUrlQuery {
  id: string;
}
export const getStaticProps: GetStaticProps<NextProps, Params> = async (
  context
) => {
  const params = context.params!;
  const { id } = params;
  const response = await backend.get(`/api/events/${+id}`);
  const event = JSON.parse(JSON.stringify(response.data));

  return {
    props: {
      event,
    },

    revalidate: 10,
  };
};

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export default EventPage;
