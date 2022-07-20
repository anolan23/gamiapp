import Link from 'next/link';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import Navbar from '../../../../../layouts/Navbar';
import Button from '../../../../../components/Button';
import FormSection from '../../../../../components/FormSection';
import InputGroup from '../../../../../components/InputGroup';
import Page from '../../../../../layouts/Page';
import Banner from '../../../../../layouts/Banner';
import useUser from '../../../../../hooks/useUser';
import SidebarManage from '../../../../../components/SidebarManage';
import ManagerDashboard from '../../../../../components/ManagerDashboard';

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
      <ManagerDashboard>
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
      </ManagerDashboard>
      <Banner>
        <Button color="secondary" text="Discard" />
        <Button type="submit" form="basic-info" text="Save & Continue" />
      </Banner>
    </Page>
  );
}

export default Details;