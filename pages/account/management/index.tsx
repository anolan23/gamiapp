import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';

import useUser, { User } from '../../../hooks/useUser';
import AccountLayout from '../../../layouts/AccountLayout';
import InputGroup from '../../../components/InputGroup';
import { update } from '../../../lib/api/users';
import { toast } from 'react-toastify';
import AccountForm from '../../../components/AccountForm';

interface ManagementValues {
  email: string;
}

function Management() {
  const { user, mutateUser } = useUser();
  const router = useRouter();

  if (!user) return <h1>...loading</h1>;

  const initialValues: ManagementValues = {
    email: user.email ?? '',
  };

  return (
    <AccountForm<ManagementValues>
      title="Account management"
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await update(user.id, values);
          toast('Account saved', {
            type: 'success',
            theme: 'colored',
            style: { backgroundColor: '#3d98ff' },
          });
        } catch (error) {
          console.error(error);
          let message = 'Error';
          if (error instanceof Error) message = error.message;
          toast(message, {
            type: 'error',
          });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ handleChange, values }) => {
        return (
          <React.Fragment>
            <InputGroup
              label="Email"
              name="email"
              onChange={handleChange}
              value={values.email}
            />
          </React.Fragment>
        );
      }}
    </AccountForm>
  );
}

Management.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default Management;
