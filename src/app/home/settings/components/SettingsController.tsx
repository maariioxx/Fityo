'use client';

import { Session } from 'next-auth';
import Form from './Form';
import NutritionSetup from '../../nutrition/components/NutritionSetup';
import SettingsNavbar from './SettingsNavbar';

export type User = {
  userId: string;
  username: string;
  created_at: string;
  birthdate: string;
  genre: string;
};

type Usernames = {
  username: string;
}[];

export default function SettingsController({
  user,
  session,
  usernames,
  searchParams,
}: {
  user: User;
  session: Session;
  usernames: Usernames;
  searchParams: { show: 'account' | 'nutrition' };
}) {
  return (
    <div>
      {searchParams.show === 'account' ? (
        <>
          <SettingsNavbar searchParams={searchParams} />
          <Form user={user!} session={session!} usernames={usernames!} />
        </>
      ) : (
        <div>
          <SettingsNavbar searchParams={searchParams} />
          <NutritionSetup update />
        </div>
      )}
    </div>
  );
}
