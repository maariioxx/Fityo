import LogOut from '@/app/home/components/navbar/LogOut';
import { redirect } from 'next/navigation';
import { auth } from '@/auth/auth';
import { getMeasuresByDate, getUser } from '../../lib/utils';
import { supabase } from 'supabase';
import NutritionSummary from './components/nutrition/NutritionSummary';
import moment from 'moment';
import HomeSetupButton from './components/HomeSetupButton';
import MeasuresSummary from './components/measures/MeasuresSummary';
import Link from 'next/link';

export default async function Page() {
  const user = await getUser();
  const session = await auth();
  if (!session || !user) redirect('/signup');
  const userCalories = await supabase
    .schema('nutrition')
    .from('calories_info')
    .select()
    .eq('user_id', user.userId);
  const userMeasures = await supabase
    .schema('fityo')
    .from('measures')
    .select()
    .eq('user_id', user.userId);
  const todayMeasures = await getMeasuresByDate();
  return (
    <div className="bg-slate-50 dark:bg-zinc-950 w-screen min-h-[91.4vh] mt-20 rounded-t-[100px] grid gap-12 lg:gap-0 lg:grid-cols-2 lg:grid-rows-[75%,25%]">
      <div className="row-start-1 row-end-3 border-t-2 lg:border-2 rounded-t-[100px] lg:rounded-tr-[0px] border-slate-400 dark:border-zinc-800 grid grid-rows-[20%,80%] justify-center gap-8 lg:gap-0">
        <Link href="/home/nutrition">
          <h1 className="text-5xl pt-8 text-center">Nutrition</h1>
        </Link>
        {typeof userCalories.data !== 'undefined' &&
        userCalories.data!?.length > 0 ? (
          <NutritionSummary date={moment().format('DD/MM/YYYY').toString()} />
        ) : (
          <HomeSetupButton link="/home/nutrition" />
        )}
      </div>
      <div className="border-t-2 lg:border-2 lg:rounded-tr-[100px] border-slate-400 dark:border-zinc-800 grid grid-rows-[20%,80%] justify-center items-center justify-items-center gap-8 lg:gap-0 pb-12 lg:pb-0">
        <Link href="/home/measures">
          <h1 className="text-5xl pt-4">Measures</h1>
        </Link>
        {typeof userMeasures.data !== 'undefined' &&
        userMeasures.data!?.length > 0 ? (
          <MeasuresSummary todayMeasures={todayMeasures} />
        ) : (
          <HomeSetupButton link="/home/measures" />
        )}
      </div>
    </div>
  );
}
