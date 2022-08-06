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
import Item from '../../components/Item';
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
import { AxiosRequestConfig } from 'axios';

const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
  ssr: false,
});

type OrderBy = 'distance' | 'starts_at';

interface EventsRequestParams {
  center: string;
  order_by: OrderBy;
  name?: string;
  radius?: number;
  categories?: string[];
  mechanics?: string[];
}

function Explore() {
  const { coords, address, setLocation, getCurrentLocation } = useLocation();
  const user = useUser();
  const { value: addressText, setValue: setAddressText } = useInput();
  const [filters, setFilters] = useState<Filters>({
    radius: 300,
    name: undefined,
    categories: [],
    mechanics: [],
  });
  const config: AxiosRequestConfig | null = useMemo(() => {
    if (!coords) return null;
    const [long, lat] = coords;
    const { name, radius, categories, mechanics } = filters;
    return {
      params: {
        center: `${long},${lat}`,
        order_by: 'distance',
        name,
        radius,
        categories,
        mechanics,
      } as EventsRequestParams,
    };
  }, [coords, filters]);
  const { data: events, loading: eventsLoading } = useBackend<Event[]>(
    `/api/events`,
    config
  );
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

  const numFilters = getNumFilters(filters);

  const renderEvents = function () {
    if (eventsLoading) return <div>loading...</div>;
    if (!events) return null;
    return events.map((event, index) => {
      return (
        <EventComponent
          key={index}
          event={event}
          onClick={() => router.push(`/events/${event.id}`)}
        />
      );
    });
  };

  console.log(events);

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
                  <Item
                    icon="my_location"
                    className="explore__current-location"
                    onMouseDown={getCurrentLocation}
                  >
                    Use my current location
                  </Item>
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
              icon={
                numFilters ? (
                  <div className="explore__filter-icon">
                    <div className="explore__filter-icon__num">
                      {numFilters}
                    </div>
                  </div>
                ) : (
                  'tune'
                )
              }
              text="Filter"
              size="small"
              color="secondary"
            />
          </div>
          {events ? (
            <span className="explore__found">
              {`Found ${events.length} events that matched your criteria`}
            </span>
          ) : null}
          <div className="explore__events">{renderEvents()}</div>
        </main>
        <div className="explore__map">
          <MapWithNoSSR center={center} markers={markers} />
        </div>
      </div>
      <Popup show={popup.show} close={popup.close}>
        <Filter
          close={popup.close}
          setFilters={setFilters}
          initialValues={filters}
        />
      </Popup>
    </Page>
  );
}

function getNumFilters(filters: Filters) {
  let length = 0;
  const { radius, name, categories, mechanics } = filters;
  if (radius !== 300) length++;
  if (name) length++;
  if (categories?.length) length += categories.length;
  if (mechanics?.length) length += mechanics.length;
  return length;
}

export default Explore;
