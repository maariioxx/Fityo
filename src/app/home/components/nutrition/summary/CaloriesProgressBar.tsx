import RadialProgressBar from '@/app/components/RadialProgressBar';
import { getCalories, getUsedMacros } from '@/lib/utils';
import moment from 'moment';

const WEEK_DAYS = [
  'sunday_calories',
  'monday_calories',
  'tuesday_calories',
  'wednesday_calories',
  'thursday_calories',
  'friday_calories',
  'saturday_calories',
] as const;

export default async function CaloriesProgressBar({ date }: { date: string }) {
  const getUserCalories = async () => {
    const info = await getCalories();
    if (info.total_calories == null) {
      return info[`${WEEK_DAYS[moment(date, 'DD/MM/YYYY').weekday()]}`];
    }
    return info.total_calories;
  };
  const userCalories = await getUserCalories();
  const { usedCalories } = await getUsedMacros(date);
  return (
    <RadialProgressBar
      color="#046C4E"
      totalCalories={userCalories!}
      takenCalories={usedCalories}
      className="col-start-1 col-end-2"
    />
  );
}
