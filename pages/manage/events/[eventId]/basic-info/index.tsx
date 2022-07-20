import Link from 'next/link';
import { useRouter } from 'next/router';

import Navbar from '../../../../../layouts/Navbar';
import Button from '../../../../../components/Button';
import FormSection from '../../../../../components/FormSection';
import InputGroup from '../../../../../components/InputGroup';
import Page from '../../../../../layouts/Page';
import Banner from '../../../../../layouts/Banner';
import useUser from '../../../../../hooks/useUser';
import SidebarManage from '../../../../../components/SidebarManage';
import BasicInfo from '../../../../../components/BasicInfo';
import ManagerDashboard from '../../../../../components/ManagerDashboard';
import Container from '../../../../../layouts/Container';

function BasicInfoPage() {
  const { user } = useUser();
  const router = useRouter();
  const { query } = router;
  console.log(query);

  return (
    <Page className="basic-info">
      <Navbar></Navbar>
      <ManagerDashboard>
        <BasicInfo onSubmit={(values) => console.log(values)} />
      </ManagerDashboard>
      <Banner>
        <Button color="secondary" text="Discard" />
        <Button type="submit" form="basic-info" text="Save & Continue" />
      </Banner>
    </Page>
  );
}

export default BasicInfoPage;
