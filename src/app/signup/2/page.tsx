import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';
import Form from './components/Form';
import { getEmail, getUser, getUsernames } from '@/lib/utils';

export default async function Page() {
  const session = await auth();
  const usernames = await getUsernames();
  console.log(session);
  if (!session) redirect('/signup');
  await getEmail();
  return (
    <div>
      <Form usernames={usernames!} />
    </div>
  );
}
