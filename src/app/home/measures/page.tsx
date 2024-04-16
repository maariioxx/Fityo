import { getMeasuresByDate, getMeasuresByInterval, getUser } from '@/lib/utils';
import MeasuresSetup from './components/MeasuresSetup';
import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';
import MeasuresGraph from './components/MeasuresGraph';
import MeasuresSummary from '../components/measures/MeasuresSummary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fityo | Measures',
};

export default async function Page() {
  const user = await getUser();
  const session = await auth();
  const measures = await getMeasuresByInterval();
  const todayMeasures = await getMeasuresByDate();
  if (!session || !user) redirect('/signup');
  return (
    <div className="bg-slate-50 dark:bg-zinc-950 w-screen min-h-screen mt-20 rounded-t-[100px] flex flex-col items-center py-10 gap-16 lg:gap-32">
      <h1 className="text-4xl">Measures</h1>
      {typeof measures !== 'undefined' &&
      measures !== null &&
      measures.length > 0 ? (
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <MeasuresGraph data={measures} />
          <MeasuresSummary todayMeasures={todayMeasures} />
        </div>
      ) : (
        <MeasuresSetup />
      )}
    </div>
  );
}
