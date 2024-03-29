import { NutritionSearch } from '@/types/API/nutritionSearchEndpoint';
import { FoodNutrients } from '@/types/API/nutritionInstantEndpoint';
import FityoFoods from './FityoFoods';

export default async function FityoFoodsFetch({
  query,
  date,
}: {
  query: string;
  date: string;
}) {
  const res = await fetch(
    `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&ingr=${query}&nutrition-type=cooking`
  );
  const data: NutritionSearch = await res.json();
  let detailedFood: FoodNutrients;
  if (data.parsed.length > 0) {
    const _res = await fetch(
      `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: [
            {
              quantity: 100,
              measureURI:
                'http://www.edamam.com/ontologies/edamam.owl#Measure_gram',
              foodId: data.parsed[0].food.foodId,
            },
          ],
        }),
      }
    );
    detailedFood = await _res.json();
  }

  return (
    <div className="">
      {data.parsed.length > 0 ? (
        data.parsed.map(({ food }) => {
          return (
            <FityoFoods
              key={food.foodId}
              food={food}
              detailedFood={detailedFood}
              date={date}
            />
          );
        })
      ) : (
        <h1>There&apos;s nothing!</h1>
      )}
    </div>
  );
}
