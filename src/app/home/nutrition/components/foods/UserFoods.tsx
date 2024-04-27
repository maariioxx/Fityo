import { getUserFoods } from '@/lib/utils';
import FoodsRow from './FoodsRow';

export default async function UserFoods({ date }: { date: string }) {
  const foods = await getUserFoods(date);
  return (
    <div className="space-y-4">
      <h1 className="text-xl text-center lg:text-left lg:pl-4">
        {typeof foods !== 'undefined' && foods!.length > 0
          ? "Today's foods"
          : 'Nothing here!'}
      </h1>

      <hr className="h-0.5 bg-gray-300" />
      {foods?.map((food) => {
        return (
          <div key={crypto.randomUUID()}>
            <FoodsRow
              userFood={food}
              foodId={food.food_id}
              date={date}
              quantity={food.quantity}
              calories={food.calories}
              carbs={food.carbs}
              sugar={food.sugar}
              fats={food.fats}
              saturated_fats={food.saturated_fats}
              protein={food.protein}
              created_at={food.created_at}
              isUserFood={true}
              isCustomFood={false}
              food={undefined}
              handleQuantityChange={undefined}
            />
          </div>
        );
      })}
    </div>
  );
}
