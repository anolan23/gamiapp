import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import useUser, { User } from '../../../hooks/useUser';
import Page from '../../../layouts/Page';
import Navbar from '../../../layouts/Navbar';
import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps } from 'next';
import backend from '../../../lib/backend';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import ButtonLink from '../../../components/ButtonLink';
import Layout from '../../../layouts/Layout';
import MaterialIcon from '../../../components/MaterialIcon';

interface Props {
  profile: User;
}

function Profile({ profile }: Props) {
  const { user } = useUser();
  const router = useRouter();

  if (router.isFallback) return <h1>loading...</h1>;

  return (
    <Page className="profile">
      <Layout navbar={<Navbar />}>
        <div className="profile__content container">
          <div className="profile__content__info">
            <Avatar height={300} width={300} objectKey={profile.image} />
            <div className="profile__content__info__text">
              <h1 className="profile__content__title">
                {profile.name ?? profile.email ?? null}
              </h1>
              <span className="profile__content__join-date">
                {`Member since ${dayjs(profile.created_at).format(
                  'MMMM YYYY'
                )}`}
              </span>
              <p className="profile__content__bio">
                {profile.bio ?? 'Your bio goes here'}
              </p>
              <div className="profile__content__attr">
                <MaterialIcon
                  className="profile__content__attr__icon"
                  icon="event"
                  filled
                />
                <span className="profile__content__attr__text">
                  Attended 0 events
                </span>
              </div>
              {user?.id === profile.id ? (
                <ButtonLink
                  href="/account"
                  text="Edit profile"
                  color="secondary"
                  size="small"
                />
              ) : null}
            </div>
          </div>
        </div>
      </Layout>
    </Page>
  );
}

type NextProps = {
  profile: User;
};

interface Params extends ParsedUrlQuery {
  id: string;
}
export const getStaticProps: GetStaticProps<NextProps, Params> = async (
  context
) => {
  const params = context.params!;
  const { id } = params;
  const response = await backend.get<User>(`/api/users/${+id}`);
  const profile: User = JSON.parse(JSON.stringify(response.data));

  return {
    props: {
      profile,
    },

    revalidate: 10,
  };
};

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export default Profile;
