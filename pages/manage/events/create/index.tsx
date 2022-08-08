import Link from 'next/link';
import { FormikProps, useFormik } from 'formik';
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
import BasicInfo from '../../../../components/BasicInfo';
import { BasicInfoValues } from '../../../../components/BasicInfo';
import Container from '../../../../layouts/Container';
import { useState } from 'react';

function Create() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async function (values: BasicInfoValues) {
    try {
      if (!user?.id) return;
      setLoading(true);
      const coords = JSON.parse(values.coords);
      const [long, lat] = coords;
      const event: any = {
        ...values,
        game: JSON.stringify(values.game),
        user_id: user.id,
        location: coords ? `POINT(${long} ${lat})` : undefined,
      };
      delete event.coords;
      const created = await createEvent(event);
      await router.push(`/manage/events/${created.id}/details`);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page className="create">
      <Navbar></Navbar>
      <Container className="create__container">
        <BasicInfo onSubmit={onSubmit} />
        <Banner>
          <Button color="secondary" text="Discard" />
          <Button
            type="submit"
            form="basic-info"
            text="Save & Continue"
            loading={loading}
          />
        </Banner>
      </Container>
    </Page>
  );
}

export default Create;
