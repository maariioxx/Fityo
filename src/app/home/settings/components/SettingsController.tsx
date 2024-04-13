'use client';

import { Session } from 'next-auth';
import Form from './Form';
import NutritionSetup from '../../nutrition/components/NutritionSetup';
import SettingsNavbar from './SettingsNavbar';
import { useState } from 'react';

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
}: {
  user: User;
  session: Session;
  usernames: Usernames;
}) {
  const [showNutrition, setShowNutrition] = useState(false);
  return (
    <div>
      <SettingsNavbar
        showNutrition={showNutrition}
        setShowNutrition={setShowNutrition}
      />
      {showNutrition ? (
        <>
          <NutritionSetup update />
        </>
      ) : (
        <>
          <Form user={user!} session={session!} usernames={usernames!} />
        </>
      )}
    </div>
  );
}
