import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';
import Form from './components/Form';
import { getEmail, getUser } from '@/lib/utils';

export default async function Page() {
  const session = await auth();
  if (!session) redirect('/signup');
  await getEmail();
  return (
    <div>
      <Form />
    </div>
  );
}
