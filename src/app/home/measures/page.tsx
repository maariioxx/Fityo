import { getMeasuresByDate, getMeasuresByInterval, getUser } from '@/lib/utils';
import MeasuresSetup from './components/MeasuresSetup';
import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';
import { supabase } from 'supabase';
import { getMeasures } from '@/lib/utils';
import MeasuresGraph from './components/MeasuresGraph';
import MeasuresSummary from '../components/measures/MeasuresSummary';

export default async function Page() {
  const user = await getUser();
  const session = await auth();
  const measures = await getMeasuresByInterval();
  const todayMeasures = await getMeasuresByDate();
  if (!session || !user) redirect('/signup');
  return (
    <div className="bg-slate-50 w-screen min-h-screen mt-20 rounded-t-[100px] flex flex-col items-center py-10 gap-16">
      <h1 className="text-4xl">Measures</h1>
      {typeof measures !== 'undefined' &&
      measures !== null &&
      measures.length > 0 ? (
        <div className="flex flex-col items-center gap-20">
          <MeasuresGraph data={measures} />
          <MeasuresSummary todayMeasures={todayMeasures} />
        </div>
      ) : (
        <MeasuresSetup />
      )}
    </div>
  );
}
