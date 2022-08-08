import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import Image from 'next/image';
import Link from 'next/link';

import { useLocation } from '../../context/location';
import { Event } from '../../hooks/useEvents';
import useGames, { Game } from '../../hooks/useGames';
import useMapbox, { Feature, Coords } from '../../hooks/useMapbox';
import useThrottle from '../../hooks/useThrottle';
import { parseAddress } from '../../lib/helpers';
import AddressItem from '../AddressItem';
import AutoComplete from '../AutoComplete';
import Button from '../Button';

import FormSection from '../FormSection';
import InputGroup from '../InputGroup';
import GameItem from '../GameItem';

export interface BasicInfoValues {
  title: string;
  game: Game;
  address: string;
  starts_at: string;
  ends_at: string;
  coords: string;
}

interface Props {
  event?: Event;
  initialValues?: BasicInfoValues;
  onSubmit: (values: BasicInfoValues) => Promise<void>;
}

function BasicInfo({ event, initialValues: initialVals, onSubmit }: Props) {
  const { coords } = useLocation();
  const { data: places, forward, getStaticMapUrl } = useMapbox();
  const { data: games, search, leanGame } = useGames();
  const throttle = useThrottle();

  const initialValues: BasicInfoValues = initialVals || {
    title: '',
    game: { name: '' },
    address: '',
    starts_at: '',
    ends_at: '',
    coords: '',
  };

  const handleSubmit = async function (
    values: BasicInfoValues,
    formikHelpers: FormikHelpers<BasicInfoValues>
  ) {
    try {
      await onSubmit(values);
      formikHelpers.setSubmitting(false);
    } catch (error) {}
  };

  const renderLocation = function ({
    setFieldValue,
    values,
    handleChange,
  }: FormikProps<BasicInfoValues>) {
    const handleEditLocationClick = function () {
      setFieldValue('address', '');
      setFieldValue('coords', '');
    };

    const { coords: coordinates, address } = values;
    if (coordinates && address) {
      const staticMapUrl = getStaticMapUrl({
        coords: JSON.parse(coordinates),
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
          value={values.address}
          onChange={(e) => {
            if (!handleChange) return;
            handleChange(e);
            throttle.wait(() => {
              if (!e.target.value) return;
              if (!coords) return;
              forward({
                coords,
                q: e.target.value,
              });
            }, 500);
          }}
          label="Venue location"
          placeholder="Search for a venue or address"
          items={places}
          Input={InputGroup}
          itemRenderer={(item) => <AddressItem placeName={item.place_name} />}
          onItemClick={(item) => {
            if (!setFieldValue) return;
            setFieldValue('address', item.place_name);
            setFieldValue('coords', JSON.stringify(item.center));
          }}
        />
      );
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formikProps) => {
        const { values, handleChange, setFieldValue } = formikProps;
        return (
          <Form id="basic-info" className="basic-info">
            <FormSection
              title="Basic Info"
              description="Name your event and tell gamers what game will be played. Add
            details that highlight what makes it unique."
              icon="segment"
            >
              <InputGroup
                name="title"
                value={values.title}
                onChange={handleChange}
                label="Event title"
                placeholder="Be clear and descriptive"
              />
              <AutoComplete<Game>
                name="game.name"
                value={values.game.name}
                onChange={(e) => {
                  handleChange(e);
                  throttle.wait(() => {
                    if (!e.target.value) return;
                    search({ name: e.target.value, limit: 5 });
                  }, 500);
                }}
                label="Featured game"
                placeholder="Search games"
                Input={InputGroup}
                items={games}
                itemRenderer={(item) => <GameItem game={item} />}
                onItemClick={(item) => {
                  const game = leanGame(item);
                  setFieldValue('game', game);
                }}
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
              {renderLocation(formikProps)}
            </FormSection>
            <FormSection
              title="Date and time"
              description="Tell gamers when your event starts and ends so they can make plans to attend."
              icon="date_range"
            >
              <InputGroup
                name="starts_at"
                value={values.starts_at}
                onChange={handleChange}
                label="Event starts"
                placeholder="Search for a venue or address"
                type="datetime-local"
                // icon="calendar_today"
              />
              <InputGroup
                name="ends_at"
                value={values.ends_at}
                onChange={handleChange}
                label="Event ends"
                placeholder="Search for a venue or address"
                type="datetime-local"
                // icon="calendar_today"
              />
            </FormSection>
          </Form>
        );
      }}
    </Formik>
  );
}

export default BasicInfo;
