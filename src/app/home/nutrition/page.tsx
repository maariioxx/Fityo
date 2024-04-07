import { getUser } from '@/lib/utils';
import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';
import { supabase } from 'supabase';
import NutritionInfo from './components/NutritionInfo';
import NutritionSetup from './components/NutritionSetup';
import moment from 'moment';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fityo | Nutrition',
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const user = await getUser();
  const session = await auth();
  if (!session || !user) redirect('/signup');
  const userCalories = await supabase
    .schema('nutrition')
    .from('calories_info')
    .select()
    .eq('user_id', user.userId);
  if (typeof searchParams['date'] === 'undefined') {
    const date = moment().format('DD/MM/YYYY').split('/').join('%2F');
    redirect(`/home/nutrition?date=${date}`);
  }
  return (
    <div className="bg-slate-50 dark:bg-zinc-950 w-screen min-h-screen mt-20 rounded-t-[100px] flex flex-col items-center py-10 gap-16">
      <h1 className="text-4xl">Nutrition</h1>
      {typeof userCalories.data !== 'undefined' &&
      userCalories.data!.length > 0 ? (
        <NutritionInfo
          date={searchParams['date']}
          query={searchParams['query']}
          searchType={searchParams['searchType']}
        />
      ) : (
        <NutritionSetup update={false} />
      )}
    </div>
  );
}
