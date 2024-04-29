import CaloriesProgressBar from './summary/CaloriesProgressBar';
import { Suspense } from 'react';
import {
  CaloriesLoadingSkeleton,
  CarbosLoadingSkeleton,
  FatsLoadingSkeleton,
  ProteinLoadingSkeleton,
} from './summary/Skeletons';
import CarbosProgressBar from './summary/CarbosProgressBar';
import FatsProgressBar from './summary/FatsProgressBar';
import ProteinProgressBar from './summary/ProteinProgressBar';

export default function NutritionSummary({
  date,
  home,
}: {
  date: string;
  home: boolean;
}) {
  return (
    <div
      className={`grid xl:grid-cols-2 lg:ml-12 ${
        home ? 'mb-16' : 'xl:mt-16'
      } justify-center lg:scale-125`}
    >
      <Suspense fallback={<CaloriesLoadingSkeleton />}>
        <CaloriesProgressBar date={date} />
      </Suspense>
      <div className="flex flex-col gap-7 -mt-2 lg:pt-3">
        <Suspense fallback={<CarbosLoadingSkeleton />}>
          <CarbosProgressBar date={date} />
        </Suspense>
        <Suspense fallback={<FatsLoadingSkeleton />}>
          <FatsProgressBar date={date} />
        </Suspense>
        <Suspense fallback={<ProteinLoadingSkeleton />}>
          <ProteinProgressBar date={date} />
        </Suspense>
      </div>
    </div>
  );
}
