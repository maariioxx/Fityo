import { getProtein, getUsedMacros } from '@/lib/utils';
import { Progress } from 'flowbite-react';
import moment from 'moment';
import { useSearchParams } from 'next/navigation';

const WEEK_DAYS = [
  'sunday_protein',
  'monday_protein',
  'tuesday_protein',
  'wednesday_protein',
  'thursday_protein',
  'friday_protein',
  'saturday_protein',
] as const;

export default async function ProteinProgressBar({ date }: { date: string }) {
  async function getUserProtein() {
    const info = await getProtein();
    if (info.total_protein == null) {
      return info[`${WEEK_DAYS[moment(date, 'DD/MM/YYYY').weekday()]}`];
    }
    return info.total_protein;
  }
  const userProtein = await getUserProtein();
  const { usedProtein } = await getUsedMacros(date);
  const getProteinPercentage = () => {
    return (usedProtein / userProtein!) * 100;
  };
  return (
    <div>
      Protein: {usedProtein.toFixed(0)}g / {userProtein?.toFixed(0)}g
      <Progress progress={getProteinPercentage()} color="red" />
    </div>
  );
}
