'use client';

import { Controller, useForm, useWatch } from 'react-hook-form';
import { Button, Tooltip } from 'flowbite-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { signUpSchema, TSignUpSchema } from '@/types/forms/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from '@/lib/actions';
import { getSession } from 'next-auth/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { ZodError } from 'zod';
import { MdCalendarMonth } from 'react-icons/md';
import moment from 'moment';
import { error } from 'console';
import { useDebouncedCallback } from 'use-debounce';
import { checkIfUsernameExists, getUser } from '@/lib/utils';

export default function Form({
  usernames,
}: {
  usernames: { username: string }[];
}) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema, { async: true }, { mode: 'async' }),
    mode: 'onBlur',
  });
  const [serverError, setServerError] = useState<string | ZodError>();
  const [usernameDuplicated, setUsernameDuplicated] = useState(false);
  const username = useWatch({ control, name: 'username' });

  useEffect(() => {
    const usernameValidation = (val: string) => {
      for (const username of usernames) {
        if (val === username.username) return setUsernameDuplicated(true);
      }
      return setUsernameDuplicated(false);
    };
    usernameValidation(username);
  }, [username, usernames]);

  const handleFormSubmit = async (data: TSignUpSchema) => {
    const session = await getSession();
    console.log(session);
    const signUpWithEmail = signUp.bind(null, session?.user?.email!);
    const res = await signUpWithEmail(data);
    if (typeof res !== 'undefined' && res.status !== 400)
      return setServerError(res.message);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <form
      action=""
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-4 justify-center"
    >
      <label className="relative grid grid-rows-2">
        <Tooltip content="A username can only contain characters, _ and -">
          <span className="absolute left-2 bottom-[4.9rem] px-2 bg-white">
            Username:
          </span>
          <input
            {...register('username')}
            type="text"
            className="form-input pr-6"
          />
        </Tooltip>
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
        {usernameDuplicated && !errors.username && (
          <p className="text-red-500">Username already exists</p>
        )}
      </label>
      <label className="relative grid grid-rows-2">
        <span className="absolute left-2 bottom-[4.9rem] px-2 bg-white">
          Birthdate:
        </span>
        <Controller
          control={control}
          name="birthdate"
          render={({ field }) => (
            <DatePicker
              showIcon
              showYearDropdown
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              minDate={moment().subtract(150, 'years').toDate()}
              maxDate={moment().subtract(18, 'years').toDate()}
              icon={<MdCalendarMonth className="absolute top-[0.30rem] z-10" />}
              className="relative form-input"
            />
          )}
        />
        {errors.birthdate && (
          <p className="text-red-500">{errors.birthdate.message}</p>
        )}
      </label>
      <label className="relative grid grid-rows-2">
        <span className="absolute left-2 bottom-[4.9rem] px-2 bg-white">
          Choose your genre:
        </span>
        <select
          {...register('genre')}
          name="genre"
          id="genre"
          className="form-input"
        >
          <option value="M">M</option>
          <option value="F">F</option>
          <option value="Other">Other</option>
        </select>
        {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}
      </label>
      <Button type="submit" color="success" size="xl">
        Submit
      </Button>
      {serverError ? (
        <p className="text-red-500">{serverError.toString()}</p>
      ) : (
        ''
      )}
    </form>
  );
}
