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
    <div className="flex flex-col items-center gap-12 w-screen">
      <PaginationArrows date={date} />
      <div className="lg:flex lg:gap-32 lg:items-start space-y-14 lg:space-y-0 p-12">
        <NutritionSummary date={date} home={false} />
        <div className="w-[105%] lg:w-[700px] flex flex-col items-center">
          <FoodsInfo date={date} query={query} searchType={searchType} />
        </div>
      </div>
    </div>
  );
}
