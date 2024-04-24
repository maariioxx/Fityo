import { redirect } from 'next/navigation';
import { auth } from '@/auth/auth';
import {
  getCalories,
  getMeasurements,
  getMeasurementsByDate,
  getUser,
} from '../../lib/utils';
import NutritionSummary from './components/nutrition/NutritionSummary';
import moment from 'moment';
import HomeSetupButton from './components/HomeSetupButton';
import MeasurementsSummary from './components/measurements/MeasurementsSummary';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fityo | Home',
};

export default async function Page() {
  const user = await getUser();
  const session = await auth();
  if (!session || !user) redirect('/signup');
  const userCalories = await getCalories();
  const userMeasurements = await getMeasurements();
  const todayMeasurements = await getMeasurementsByDate();
  return (
    <div className="bg-slate-50 dark:bg-zinc-950 w-screen min-h-[91.4vh] mt-20 rounded-t-[100px] grid gap-24 lg:gap-0 lg:grid-cols-2 lg:grid-rows-1">
      <div className="row-start-1 row-end-3 border-t-2 rounded-t-[100px] lg:rounded-tr-[0px] border-slate-400 dark:border-zinc-800 grid grid-rows-[20%,80%] justify-center items-center gap-8 lg:gap-0">
        <Link href="/home/nutrition">
          <h1 className="text-5xl pt-8 text-center">Nutrition</h1>
        </Link>
        {typeof userCalories !== 'undefined' ? (
          <NutritionSummary date={moment().format('DD/MM/YYYY').toString()} />
        ) : (
          <HomeSetupButton link="/home/nutrition" />
        )}
      </div>
      <div className="border-t-2 lg:rounded-tr-[100px] border-slate-400 dark:border-zinc-800 grid grid-rows-[20%,80%] justify-center items-center justify-items-center gap-8 lg:gap-0 pb-32 mb-12 lg:pb-0">
        <Link href="/home/measurements">
          <h1 className="text-5xl pt-4">Measurements</h1>
        </Link>
        {typeof userMeasurements !== 'undefined' ? (
          <MeasurementsSummary todayMeasurements={todayMeasurements} />
        ) : (
          <HomeSetupButton link="/home/measurements" />
        )}
      </div>
    </div>
  );
}
