import {
  getMeasurementsByDate,
  getMeasurementsByInterval,
  getUser,
} from '@/lib/utils';
import MeasurementsSetup from './components/MeasurementsSetup';
import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';
import MeasurementsGraph from './components/MeasurementsGraph';
import MeasurementsSummary from '../components/measurements/MeasurementsSummary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fityo | Measurements',
};

export default async function Page() {
  const user = await getUser();
  const session = await auth();
  const measurements = await getMeasurementsByInterval();
  const todayMeasurements = await getMeasurementsByDate();
  if (!session || !user) redirect('/signup');
  return (
    <div className="bg-slate-50 dark:bg-zinc-950 w-screen min-h-screen mt-20 rounded-t-[100px] flex flex-col items-center py-10 gap-16 lg:gap-32">
      <h1 className="text-4xl">Measurements</h1>
      {typeof measurements !== 'undefined' &&
      measurements !== null &&
      measurements.length > 0 ? (
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <MeasurementsGraph data={measurements} />
          <MeasurementsSummary todayMeasurements={todayMeasurements} />
        </div>
      ) : (
        <MeasurementsSetup />
      )}
    </div>
  );
}
