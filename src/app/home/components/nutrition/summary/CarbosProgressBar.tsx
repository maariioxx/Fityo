import { getCarbos, getUsedMacros } from '@/lib/utils';
import { Progress } from 'flowbite-react';
import moment from 'moment';

const WEEK_DAYS = [
  'sunday_carbohidrates',
  'monday_carbohidrates',
  'tuesday_carbohidrates',
  'wednesday_carbohidrates',
  'thursday_carbohidrates',
  'friday_carbohidrates',
  'saturday_carbohidrates',
] as const;

export default async function CarbosProgressBar({ date }: { date: string }) {
  const getUserCarbos = async () => {
    const info = await getCarbos();
    if (info.total_carbohidrates == null) {
      return info[`${WEEK_DAYS[moment(date, 'DD/MM/YYYY').weekday()]}`];
    }
    return info.total_carbohidrates;
  };
  const userCarbos = await getUserCarbos();
  const { usedCarbs } = await getUsedMacros(date);
  const getCarbosPercentage = () => {
    return (usedCarbs / userCarbos!) * 100;
  };
  return (
    <div>
      Carbohydrates: {usedCarbs.toFixed(0)}g / {userCarbos!.toFixed(0)}g
      <Progress progress={getCarbosPercentage()} color="yellow" />
    </div>
  );
}
