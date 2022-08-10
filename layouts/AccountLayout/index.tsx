import { ReactElement } from 'react';
import AccountSidebar from '../../components/AccountSidebar';
import Layout from '../Layout';
import Navbar from '../Navbar';
import Page from '../Page';

interface Props {
  children: ReactElement;
}
function AccountLayout({ children }: Props) {
  return (
    <Page>
      <Layout navbar={<Navbar />} sidebar={<AccountSidebar />}>
        {children}
      </Layout>
    </Page>
  );
}

export default AccountLayout;
