import dynamic from 'next/dynamic';

import Navbar from '../../layouts/Navbar';
import Button from '../../components/Button';
import EventComponent from '../../components/Event';
import Input from '../../components/Input';
import ListRenderer from '../../components/ListRenderer';
import Page from '../../layouts/Page';
import { useRouter } from 'next/router';
import useUser from '../../hooks/useUser';
import useBackend from '../../hooks/useBackend';
import { useMemo, useState } from 'react';
import { Event } from '../../hooks/useEvents';
import { MarkerType } from '../../components/Map';
import useMapbox, { Coords, Feature } from '../../hooks/useMapbox';
import ButtonLink from '../../components/ButtonLink';
import { useFormik } from 'formik';
import AutoComplete from '../../components/AutoComplete';
import useThrottle from '../../hooks/useThrottle';
import AddressItem from '../../components/AddressItem';
import { useLocation } from '../../context/location';
import DropdownItem from '../../components/DropdownItem';

const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
  ssr: false,
});

function Explore() {
  const { coords, address, setLocation, getCurrentLocation } = useLocation();
  const throttle = useThrottle();
  const { data: places, forward } = useMapbox();
  const formik = useFormik({
    initialValues: {
      address,
    },
    onSubmit(values) {
      console.log(values);
    },
    enableReinitialize: true,
  });
  const user = useUser();
  const config = useMemo(() => {
    if (!coords) return null;
    const [long, lat] = coords;
    return {
      params: {
        center: `${long},${lat}`,
        radius: 5,
      },
    };
  }, [coords]);

  const { data: events } = useBackend<Event[]>(`/api/events`, config);
  const router = useRouter();

  const center: Coords | undefined = coords
    ? [coords[1], coords[0]]
    : undefined;

  const markers = events
    ? events.map((event): MarkerType => {
        const [long, lat] = event.coords!;
        return {
          position: [lat, long],
        };
      })
    : undefined;

  console.log(center);

  return (
    <Page className="explore">
      <Navbar>
        <ButtonLink
          href="/manage/events/create"
          size="small"
          icon="add"
          text="Create event"
          color="primary"
        />
      </Navbar>
      <div className="explore__content">
        <main className="explore__main">
          <div className="explore__main__filters">
            <form
              onSubmit={formik.handleSubmit}
              className="explore__main__filters__inputs"
            >
              <AutoComplete<Feature>
                name="address"
                icon="location_on"
                placeholder="Choose a location"
                className="explore__input"
                onChange={(e) => {
                  formik.handleChange(e);
                  throttle.wait(() => {
                    if (!e.target.value) return;
                    if (!coords) return;
                    forward({
                      coords,
                      q: e.target.value,
                    });
                  }, 500);
                }}
                items={places}
                onItemClick={(item) => {
                  setLocation(item.center, item.place_name);
                }}
                value={formik.values.address}
                Input={Input}
                stickyItemsRenderer={() => (
                  <DropdownItem
                    icon="my_location"
                    className="explore__current-location"
                    onMouseDown={getCurrentLocation}
                  >
                    Use my current location
                  </DropdownItem>
                )}
                itemRenderer={(item) => (
                  <AddressItem placeName={item.place_name} />
                )}
                onFocus={() => {
                  formik.setFieldValue('address', '');
                }}
                onBlur={() => {
                  formik.setFieldValue('address', address);
                }}
              />
            </form>
            <Button icon="tune" text="Filter" size="small" color="secondary" />
          </div>
          <div className="explore__events">
            <ListRenderer
              list={events}
              itemRenderer={(event: Event, index) => {
                return (
                  <EventComponent
                    key={index}
                    event={event}
                    onClick={() => router.push(`/events/${event.id}`)}
                  />
                );
              }}
            />
          </div>
        </main>
        <div className="explore__map">
          <MapWithNoSSR center={center} markers={markers} />
        </div>
      </div>
    </Page>
  );
}

export default Explore;
