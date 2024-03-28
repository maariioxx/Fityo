'use client';

import { FoodNutrients } from '@/types/API/nutritionInstantEndpoint';
import { ParsedFood } from '@/types/API/nutritionSearchEndpoint';
import { useState } from 'react';
import FoodsRow from './FoodsRow';

export function calculateMacros(macro: number, quantity: number) {
  return (macro / 100) * quantity;
}

export default function AddFoodsRow({
  food,
  detailedFood,
  date,
}: {
  food: ParsedFood;
  detailedFood: FoodNutrients;
  date: string;
}) {
  const [quantity, setQuantity] = useState(100);
  const [calories, setCalories] = useState(food.nutrients.ENERC_KCAL);
  const [carbs, setCarbs] = useState(food.nutrients.CHOCDF);
  const [sugar, setSugar] = useState(
    detailedFood.totalNutrients.SUGAR.quantity
  );
  const [fats, setFats] = useState(food.nutrients.FAT);
  const [saturated_fats, setSaturatedFats] = useState(
    detailedFood.totalNutrients.FASAT.quantity
  );
  const [protein, setProtein] = useState(food.nutrients.PROCNT);

  const handleQuantityChange = (quantityInput: number) => {
    let _quantity = quantityInput;
    if (quantityInput >= 1000) _quantity = 1000;
    setQuantity(_quantity);
    setCalories(calculateMacros(food.nutrients.ENERC_KCAL, _quantity));
    setCarbs(calculateMacros(food.nutrients.CHOCDF, _quantity));
    setSugar(
      calculateMacros(detailedFood.totalNutrients.SUGAR.quantity, _quantity)
    );
    setFats(calculateMacros(food.nutrients.FAT, _quantity));
    setSaturatedFats(
      calculateMacros(detailedFood.totalNutrients.FASAT.quantity, _quantity)
    );
    setProtein(calculateMacros(food.nutrients.PROCNT, _quantity));
  };

  return (
    <FoodsRow
      food={food}
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
