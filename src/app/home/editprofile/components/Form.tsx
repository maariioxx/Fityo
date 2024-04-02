'use client';

import { editProfile } from '@/lib/actions';
import { TEditProfile, editProfileSchema } from '@/types/forms/editprofile';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'flowbite-react';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

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

export default function Form({
  user,
  session,
  usernames,
}: {
  user: User;
  session: Session;
  usernames: Usernames;
}) {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TEditProfile>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onBlur',
  });
  const [usernameDuplicated, setUsernameDuplicated] = useState(false);
  const username = useWatch({ control, name: 'username' });

  useEffect(() => {
    const usernameValidation = (val: string) => {
      for (const username of usernames) {
        if (val === username.username && val !== user.username)
          return setUsernameDuplicated(true);
      }
      return setUsernameDuplicated(false);
    };
    usernameValidation(username);
  }, [username, usernames, user.username]);

  const handleFormSubmit = async (data: TEditProfile) => {
    const editProfileWithData = editProfile.bind(null, user, session);
    const res = await editProfileWithData(data);
    console.log(res);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <label className="flex flex-col">
        Username:
        <input
          {...register('username')}
          type="text"
          className={`form-input max-w-64 ${
            errors.username || usernameDuplicated
              ? 'border-2 !border-red-500 focus:!border-red-500 focus:!ring-red-500'
              : ''
          }`}
          defaultValue={user.username}
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
        {usernameDuplicated && !errors.username && (
          <p className="text-red-500">Username already exists</p>
        )}
      </label>
      <label className="flex flex-col">
        Name:
        <input
          {...register('name')}
          type="text"
          className={`form-input max-w-64 ${
            errors.name
              ? 'border-2 !border-red-500 focus:!border-red-500 focus:!ring-red-500'
              : ''
          }`}
          defaultValue={session.user?.name!}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </label>
      <label className="flex flex-col">
        Email:
        <input
          {...register('email')}
          type="email"
          className={`form-input max-w-64 ${
            errors.email
              ? 'border-2 !border-red-500 focus:!border-red-500 focus:!ring-red-500'
              : ''
          }`}
          defaultValue={session.user?.email!}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </label>
      <Button type="submit" color="success">
        Update changes
      </Button>
    </form>
  );
}
