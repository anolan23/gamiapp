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
import BasicInfo from '../../../../components/BasicInfo';
import { BasicInfoValues } from '../../../../components/BasicInfo';

function Create() {
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async function (values: BasicInfoValues) {
    try {
      if (!user?.id) return;
      const event = { ...values, userId: user.id, gameId: +values.gameId };
      const created = await createEvent(event);
      router.push(`/manage/events/${created.id}/details`);
    } catch (error) {}
  };

  return (
    <Page className="create">
      <Navbar></Navbar>
      <BasicInfo onSubmit={onSubmit} />
      <Banner>
        <Button color="secondary" text="Discard" />
        <Button type="submit" form="basic-info" text="Save & Continue" />
      </Banner>
    </Page>
  );
}

export default Create;
