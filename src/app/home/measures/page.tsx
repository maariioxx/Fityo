import { getUser } from '@/lib/utils';
import MeasuresSetup from './components/MeasuresSetup';
import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';
import { supabase } from 'supabase';

export default async function Page() {
  const user = await getUser();
  const session = await auth();
  if (!session || !user) redirect('/signup');
  const userMeasures = await supabase
    .schema('fityo')
    .from('measures')
    .select()
    .eq('user_id', user.userId);
  return (
    <div className="bg-slate-50 w-screen min-h-screen mt-20 rounded-t-[100px] flex flex-col items-center py-10 gap-16">
      <h1 className="text-4xl">Measures</h1>
      {typeof userMeasures.data !== 'undefined' &&
      userMeasures.data !== null &&
      userMeasures.data!.length > 0 ? (
        <div>Epa</div>
      ) : (
        <MeasuresSetup />
      )}
    </div>
  );
}
