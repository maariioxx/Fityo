'use client';

import { FoodNutrients } from '@/types/API/nutritionInstantEndpoint';
import { ParsedFood } from '@/types/API/nutritionSearchEndpoint';
import { use, useEffect, useState } from 'react';
import FoodsRow from '../../FoodsRow';

export function calculateMacros(macro: number, quantity: number) {
  return (macro / 100) * quantity;
}

export default function FityoFoods({
  food,
  detailedFood,
  date,
}: {
  food: ParsedFood;
  detailedFood: FoodNutrients;
  date: string;
}) {
  useEffect(() => {
    console.log(detailedFood);
  }, []);
  const [quantity, setQuantity] = useState('100');
  const [calories, setCalories] = useState(
    typeof food.nutrients.ENERC_KCAL === 'undefined'
      ? 0
      : food.nutrients.ENERC_KCAL
  );
  const [carbs, setCarbs] = useState(
    typeof food.nutrients.CHOCDF === 'undefined' ? 0 : food.nutrients.CHOCDF
  );
  const [sugar, setSugar] = useState(
    typeof detailedFood.totalNutrients.SUGAR === 'undefined'
      ? 0
      : detailedFood.totalNutrients.SUGAR.quantity
  );
  const [fats, setFats] = useState(
    typeof food.nutrients.FAT === 'undefined' ? 0 : food.nutrients.FAT
  );
  const [saturated_fats, setSaturatedFats] = useState(
    typeof detailedFood.totalNutrients.FASAT === 'undefined'
      ? 0
      : detailedFood.totalNutrients.FASAT.quantity
  );
  const [protein, setProtein] = useState(
    typeof food.nutrients.PROCNT === 'undefined' ? 0 : food.nutrients.PROCNT
  );

  const handleQuantityChange = (quantityInput: string) => {
    let _quantity = quantityInput;
    if (isNaN(Number(quantityInput))) _quantity = '0';
    else if (Number(quantityInput) >= 1000) _quantity = '1000';
    setQuantity(_quantity);
    setCalories(calculateMacros(food.nutrients.ENERC_KCAL, Number(_quantity)));
    setCarbs(calculateMacros(food.nutrients.CHOCDF, Number(_quantity)));
    setSugar(
      calculateMacros(
        detailedFood.totalNutrients.SUGAR.quantity,
        Number(_quantity)
      )
    );
    setFats(calculateMacros(food.nutrients.FAT, Number(_quantity)));
    setSaturatedFats(
      calculateMacros(
        detailedFood.totalNutrients.FASAT.quantity,
        Number(_quantity)
      )
    );
    setProtein(calculateMacros(food.nutrients.PROCNT, Number(_quantity)));
  };

  return (
    <FoodsRow
      food={food}
      foodId={food.foodId}
      date={date}
      quantity={quantity}
      handleQuantityChange={handleQuantityChange}
      calories={calories}
      carbs={carbs}
      sugar={sugar}
      fats={fats}
      saturated_fats={saturated_fats}
      protein={protein}
      isUserFood={false}
      isCustomFood={false}
      userFood={undefined}
      created_at={undefined}
    />
  );
}
