import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import useUser from '../../../hooks/useUser';
import Page from '../../../layouts/Page';
import Navbar from '../../../layouts/Navbar';
import Container from '../../../layouts/Container';
import { GetStaticProps } from 'next';
import backend from '../../../lib/backend';
import { ParsedUrlQuery } from 'querystring';
import { Event } from '../../../hooks/useEvents';
import Image from 'next/image';
import Button from '../../../components/Button';
import { parseAddress } from '../../../lib/helpers';
import useMapbox from '../../../hooks/useMapbox';

interface Props {
  event: Event;
}

function EventPage({ event }: Props) {
  const { user } = useUser();
  const router = useRouter();
  const { getStaticMapUrl } = useMapbox();
  const { slug } = router.query;

  if (router.isFallback) return <h1>loading...</h1>;

  const { street, city } = parseAddress(event.address);
  const staticMapUrl = event.coords
    ? getStaticMapUrl({
        coords: event.coords,
        width: 1000,
        height: 400,
      })
    : undefined;
  const renderStaticMap = function () {
    if (!staticMapUrl) return null;
    return (
      <Image
        src={staticMapUrl}
        alt="event map"
        layout="fill"
        objectFit="contain"
      />
    );
  };

  return (
    <Page>
      <Navbar></Navbar>
      <Container className="events-page">
        <div className="events-page__background">
          <Image
            className="events-page__background__image"
            src={event.image || '/event.jpeg'}
            alt="background"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="events-page__event">
          <div className="events-page__event__image">
            <Image
              src={event.image || '/event.jpeg'}
              alt="event"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="events-page__event__content">
            <div className="events-page__event__content__left">
              <h1 className="events-page__event__title">{event.title}</h1>
              <p className="events-page__event__summary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div>
                <h2 className="events-page__event__about">About this event</h2>
                <p className="events-page__event__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <div className="events-page__event__content__right">
              <Button text="Join" />
              <div className="events-page__event__details">
                <div className="events-page__event__detail">
                  <span className="material-icons events-page__event__detail__icon">
                    date_range
                  </span>
                  <div className="events-page__event__detail__content">
                    <h3 className="events-page__event__detail__content__heading">
                      Date and time
                    </h3>
                    <time className="events-page__event__detail__content__values">
                      <p>Sun, August 28, 2022</p>
                      <p>7:00 PM - 10:00 PM CDT</p>
                    </time>
                  </div>
                  <div></div>
                </div>
                <div className="events-page__event__detail">
                  <span className="material-icons events-page__event__detail__icon">
                    location_on
                  </span>
                  <div className="events-page__event__detail__content">
                    <h3 className="events-page__event__detail__content__heading">
                      Location
                    </h3>
                    <div className="events-page__event__detail__content__values">
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
            </div>
          </div>
          <div className="events-page__event__map">{renderStaticMap()}</div>
          <div className="events-page__event__address">
            <div className="events-page__event__address__container">
              <span>{event.title}</span>
              <span className="events-page__event__address__container--small">
                at
              </span>
              <span>{street}</span>
              <span className="events-page__event__address__container--small">
                {city}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Page>
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
