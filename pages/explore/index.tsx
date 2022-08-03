import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import useBackend from '../../hooks/useBackend';
import useMapbox, { Coords, Feature } from '../../hooks/useMapbox';
import useUser from '../../hooks/useUser';
import useThrottle from '../../hooks/useThrottle';
import { useLocation } from '../../context/location';

import AddressItem from '../../components/AddressItem';
import AutoComplete from '../../components/AutoComplete';
import Button from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';
import DropdownItem from '../../components/DropdownItem';
import EventComponent from '../../components/Event';
import Input from '../../components/Input';
import ListRenderer from '../../components/ListRenderer';
import Navbar from '../../layouts/Navbar';
import Page from '../../layouts/Page';
import Popup from '../../components/Popup';
import { MarkerType } from '../../components/Map';
import { Event } from '../../hooks/useEvents';
import Filter, { Filters } from '../../components/Filter';
import usePopup from '../../hooks/usePopup';
import useInput from '../../hooks/useInput';

const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
  ssr: false,
});

function Explore() {
  const { coords, address, setLocation, getCurrentLocation } = useLocation();
  const user = useUser();
  const { value: addressText, setValue: setAddressText } = useInput();
  const [filters, setFilters] = useState<Filters>({
    name: '',
    categories: [],
    radius: 150,
  });
  const config = useMemo(() => {
    if (!coords) return null;
    const [long, lat] = coords;
    return {
      params: {
        center: `${long},${lat}`,
        name: filters.name,
        radius: filters.radius,
        categories: filters.categories,
        mechanics: filters.mechanics,
      },
    };
  }, [coords, filters]);
  const { data: events } = useBackend<Event[]>(`/api/events`, config);
  const { data: places, forward } = useMapbox();
  const throttle = useThrottle();
  const router = useRouter();
  const popup = usePopup();

  //Update address text if address changes
  useEffect(() => {
    setAddressText(address || '');
  }, [setAddressText, address]);

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
            <div className="explore__main__filters__inputs">
              <AutoComplete<Feature>
                icon="location_on"
                placeholder="Choose a location"
                className="explore__input"
                onChange={(e) => {
                  setAddressText(e.target.value);
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
                value={addressText}
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
                  setAddressText('');
                }}
                onBlur={() => {
                  setAddressText(address || '');
                }}
              />
            </div>
            <Button
              onClick={() => popup.setShow(true)}
              icon="tune"
              text="Filter"
              size="small"
              color="secondary"
            />
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
      <Popup show={popup.show} close={popup.close}>
        <Filter
          onSubmit={(values) => {
            setFilters(values);
            popup.close();
          }}
          initialValues={filters}
        />
      </Popup>
    </Page>
  );
}

export default Explore;
