import Link from 'next/link';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import Navbar from '../../../../../layouts/Navbar';
import Button from '../../../../../components/Button';
import DropdownButton from '../../../../../components/DropdownButton';
import Input from '../../../../../components/Input';
import FormSection from '../../../../../components/FormSection';
import InputGroup from '../../../../../components/InputGroup';
import Page from '../../../../../layouts/Page';
import Banner from '../../../../../layouts/Banner';
import { createEvent } from '../../../../../lib/api';
import useUser from '../../../../../hooks/useUser';
import Sidebar from '../../../../../layouts/Sidebar';
import Step from '../../../../../components/Step';
import DropdownItem from '../../../../../components/DropdownItem';

function Details() {
  const { user } = useUser();
  const router = useRouter();
  const { query } = router;
  console.log(query);
  const formik = useFormik({
    initialValues: {
      summary: '',
    },
    async onSubmit(values) {
      try {
        console.log(values);
      } catch (error) {}
    },
  });

  return (
    <Page className="details">
      <Navbar></Navbar>
      <div className="details__content">
        <Sidebar>
          <button onClick={() => router.push('/')} className="details__back">
            <span className="material-icons details__back__icon">
              chevron_left
            </span>
            <span className="details__back__text">Events</span>
          </button>
          <div className="details__details">
            <DropdownButton text="Draft" color="secondary" openTo="right">
              <DropdownItem icon="menu_book">Publish now</DropdownItem>
            </DropdownButton>
            <span className="details__details__title">Halo 3 LAN Party</span>
            <span className="details__details__date">
              Sun, Aug 28, 2022 7:00 PM
            </span>
            <Link href="/" passHref>
              <a className="details__details__preview">
                <span className="details__details__preview__text">
                  Preview your event
                </span>
                <span className="material-icons details__details__preview__icon">
                  open_in_new
                </span>
              </a>
            </Link>
          </div>
          <div className="details__steps">
            <Step step={1} main="Basic Info" complete />
            <Step step={2} main="Details" active />
            <Step step={3} main="Publish" />
          </div>
        </Sidebar>
        <form id="basic-info" onSubmit={formik.handleSubmit}>
          <FormSection
            title="Main Event Image"
            description="This is the first image gamers will see at the top of your listing. Use a high quality image: 2160x1080px (2:1 ratio)."
            icon="image"
          ></FormSection>
          <FormSection
            title="Description"
            description="Add more details to your event."
            icon="segment"
          >
            <InputGroup
              name="summary"
              value={formik.values.summary}
              onChange={formik.handleChange}
              label="Summary"
              placeholder="Write a short event summary to get attendees excited"
            />
          </FormSection>
        </form>
      </div>
      <Banner>
        <Button color="secondary" text="Discard" />
        <Button type="submit" form="basic-info" text="Save & Continue" />
      </Banner>
    </Page>
  );
}

export default Details;
