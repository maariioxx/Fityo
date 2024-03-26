import { getFats, getUsedMacros } from '@/lib/utils';
import { Progress } from 'flowbite-react';
import moment from 'moment';

const WEEK_DAYS = [
  'sunday_fats',
  'monday_fats',
  'tuesday_fats',
  'wednesday_fats',
  'thursday_fats',
  'friday_fats',
  'saturday_fats',
] as const;

export default async function FatsProgressBar({ date }: { date: string }) {
  async function getUserFats() {
    const info = await getFats();
    if (info.total_fats == null) {
      return info[`${WEEK_DAYS[moment(date, 'DD/MM/YYYY').weekday()]}`];
    }
    return info.total_fats;
  }
  const userFats = await getUserFats();
  const { usedFats } = await getUsedMacros(date);
  const getFatsPercentage = () => {
    return (usedFats / userFats!) * 100;
  };
  return (
    <div>
      Fats: {usedFats.toFixed(0)}g / {userFats!.toFixed(0)}g
      <Progress progress={getFatsPercentage()} color="purple" />
    </div>
  );
}
