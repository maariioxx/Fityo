import { getEmail, getUser, getUsernames } from '@/lib/utils';
import Form from './components/Form';
import { auth } from '@/auth/auth';

export default async function Page() {
  const user = await getUser(false);
  const session = await auth();
  const usernames = await getUsernames();
  console.log(session);
  return (
    <div className="bg-slate-50 dark:bg-zinc-950 min-h-screen w-screen mt-20 rounded-t-[100px] flex justify-center">
      <div className="w-1/2 p-12 flex flex-col items-center gap-12">
        <h1 className="text-4xl">Edit Profile</h1>
        <Form user={user!} session={session!} usernames={usernames!} />
      </div>
    </div>
  );
}
