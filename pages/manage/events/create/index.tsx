import Link from 'next/link';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import Navbar from '../../../../layouts/Navbar';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import FormSection from '../../../../components/FormSection';
import InputGroup from '../../../../components/InputGroup';
import Page from '../../../../layouts/Page';
import Banner from '../../../../layouts/Banner';
import { createEvent } from '../../../../lib/api';
import useUser from '../../../../hooks/useUser';

function Create() {
  const { user } = useUser();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: '',
      gameId: '',
      address: '',
      startsAt: '',
      endsAt: '',
    },
    async onSubmit(values) {
      try {
        if (!user?.id) return;
        const event = { ...values, userId: user.id, gameId: +values.gameId };
        const created = await createEvent(event);
        router.push(`/manage/events/${created.id}`);
      } catch (error) {}
    },
  });

  return (
    <Page className="create">
      <Navbar></Navbar>
      <form
        id="basic-info"
        onSubmit={formik.handleSubmit}
        className="create__content"
      >
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
            name="gameId"
            value={formik.values.gameId}
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
          <InputGroup
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            label="Venue location"
            placeholder="Search for a venue or address"
          />
        </FormSection>
        <FormSection
          title="Date and time"
          description="Tell gamers when your event starts and ends so they can make plans to attend."
          icon="date_range"
        >
          <InputGroup
            name="startsAt"
            value={formik.values.startsAt}
            onChange={formik.handleChange}
            label="Event starts"
            placeholder="Search for a venue or address"
            type="datetime-local"
            // icon="calendar_today"
          />
          <InputGroup
            name="endsAt"
            value={formik.values.endsAt}
            onChange={formik.handleChange}
            label="Event ends"
            placeholder="Search for a venue or address"
            type="datetime-local"
            // icon="calendar_today"
          />
        </FormSection>
      </form>
      <Banner>
        <Button color="secondary">Discard</Button>
        <Button type="submit" form="basic-info">
          Save and Continue
        </Button>
      </Banner>
    </Page>
  );
}

export default Create;
