import NutritionSummary from '../../components/nutrition/NutritionSummary';
import PaginationArrows from '../../components/nutrition/PaginationArrows';
import FoodsInfo from './foods/FoodsInfo';

export default function NutritionInfo({
  date,
  query,
  searchType,
}: {
  date: string;
  query: string;
  searchType: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 w-screen">
      <PaginationArrows date={date} />
      <div className="space-y-14">
        <NutritionSummary date={date} />
        <div>
          <FoodsInfo date={date} query={query} searchType={searchType} />
        </div>
      </div>
    </div>
  );
}
