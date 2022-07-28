import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { Event } from '../../hooks/useEvents';
import useMapbox, { Feature, Coords } from '../../hooks/useMapbox';
import useThrottle from '../../hooks/useThrottle';
import { parseAddress } from '../../lib/helpers';
import AddressItem from '../AddressItem';
import AutoComplete from '../AutoComplete';
import Button from '../Button';

import FormSection from '../FormSection';
import InputGroup from '../InputGroup';

export interface BasicInfoValues {
  title: string;
  game_id: string;
  address: string;
  starts_at: string;
  ends_at: string;
  coords: string;
}

interface Props {
  event?: Event;
  initialValues?: BasicInfoValues;
  onSubmit: (values: BasicInfoValues) => any;
}

function BasicInfo({ event, initialValues, onSubmit }: Props) {
  const { data, forward, getStaticMapUrl } = useMapbox();
  const throttle = useThrottle();
  const initValues: BasicInfoValues = initialValues || {
    title: '',
    game_id: '',
    address: '',
    starts_at: '',
    ends_at: '',
    coords: '',
  };
  const formik = useFormik({
    initialValues: initValues,
    onSubmit,
  });

  const handleEditLocationClick = function () {
    formik.setFieldValue('address', '');
    formik.setFieldValue('coords', '');
  };

  const renderLocation = function () {
    const { coords, address } = formik.values;
    if (coords && address) {
      const staticMapUrl = getStaticMapUrl({
        coords: JSON.parse(coords),
        width: 600,
        height: 165,
      });
      const { street, city } = parseAddress(address);
      return (
        <div className="basic-info__location">
          <div className="basic-info__location__image-container">
            <Image
              src={staticMapUrl}
              alt="static map"
              layout="fill"
              objectFit="fill"
            />
          </div>
          <div className="basic-info__location__address-container">
            <div className="basic-info__location__address-container__address">
              <span className="basic-info__location__street">{street}</span>
              <span className="basic-info__location__city">{city}</span>
            </div>
            <Button
              text="Edit location"
              color="secondary"
              size="small"
              onClick={handleEditLocationClick}
            />
          </div>
        </div>
      );
    } else {
      return (
        <AutoComplete<Feature>
          name="address"
          value={formik.values.address}
          onChange={(e) => {
            formik.handleChange(e);
            throttle.wait(() => {
              if (!e.target.value) return;
              forward(e.target.value);
            }, 500);
          }}
          label="Venue location"
          placeholder="Search for a venue or address"
          items={data}
          itemRenderer={(item) => <AddressItem placeName={item.place_name} />}
          onItemClick={(item) => {
            formik.setFieldValue('address', item.place_name);
            formik.setFieldValue('coords', JSON.stringify(item.center));
          }}
        />
      );
    }
  };

  return (
    <form id="basic-info" onSubmit={formik.handleSubmit} className="basic-info">
      <FormSection
        title="Basic Info"
        description="Name your event and tell gamers what game will be played. Add
            details that highlight what makes it unique."
        icon="segment"
      >
        <InputGroup
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          label="Event title"
          placeholder="Be clear and descriptive"
        />
        <InputGroup
          name="game_id"
          value={formik.values.game_id}
          onChange={formik.handleChange}
          label="Featured game"
          placeholder="Search games"
        />
        <span>
          Need game ideas?{' '}
          <Link href="/" passHref>
            <a className="link">Browse games by category</a>
          </Link>
        </span>
      </FormSection>
      <FormSection
        title="Location"
        description="Help gamers in the area discover your event and let attendees know where to show up."
        icon="map"
      >
        {renderLocation()}
      </FormSection>
      <FormSection
        title="Date and time"
        description="Tell gamers when your event starts and ends so they can make plans to attend."
        icon="date_range"
      >
        <InputGroup
          name="starts_at"
          value={formik.values.starts_at}
          onChange={formik.handleChange}
          label="Event starts"
          placeholder="Search for a venue or address"
          type="datetime-local"
          // icon="calendar_today"
        />
        <InputGroup
          name="ends_at"
          value={formik.values.ends_at}
          onChange={formik.handleChange}
          label="Event ends"
          placeholder="Search for a venue or address"
          type="datetime-local"
          // icon="calendar_today"
        />
      </FormSection>
    </form>
  );
}

export default BasicInfo;
