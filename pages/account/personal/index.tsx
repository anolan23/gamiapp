import { ReactElement } from 'react';
import AccountLayout from '../../../layouts/AccountLayout';

interface Props {}

function PersonalInfo(props: Props) {
  return <div>Personal Info</div>;
}

PersonalInfo.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default PersonalInfo;
