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
        <div className="profile__content">
          <div className="profile__content__info">
            <Avatar height={300} width={300} />
            <div className="profile__content__info__text">
              <h1 className="profile__content__title">
                {profile.first_name ? `${profile.first_name}` : 'Your name'}
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
                <span className="material-icons-outlined profile__content__attr__icon">
                  event
                </span>
                <span className="profile__content__attr__text">
                  Attended 0 events
                </span>
              </div>
              <ButtonLink
                href="/account"
                text="Edit profile"
                color="secondary"
              />
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
