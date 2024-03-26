'use client';

import { FoodNutrients } from '@/types/API/nutritionInstantEndpoint';
import { ParsedFood } from '@/types/API/nutritionSearchEndpoint';
import { useState } from 'react';
import FoodsRow from '../../FoodsRow';
import { CustomFoods } from '@/types/foods/customFoods';

export function calculateMacros(macro: number, quantity: number) {
  return (macro / 100) * quantity;
}

export default function FityoFoods({
  food,
  date,
}: {
  food: CustomFoods;
  date: string;
}) {
  const [quantity, setQuantity] = useState(100);
  const [calories, setCalories] = useState(food.calories);
  const [carbs, setCarbs] = useState(food.carbohydrates);
  const [sugar, setSugar] = useState(food.sugar);
  const [fats, setFats] = useState(food.fats);
  const [saturated_fats, setSaturatedFats] = useState(food.saturated_fats);
  const [protein, setProtein] = useState(food.protein);

  const handleQuantityChange = (quantityInput: number) => {
    let _quantity = quantityInput;
    if (quantityInput >= 1000) _quantity = 1000;
    setQuantity(_quantity);
    setCalories(calculateMacros(food.calories, _quantity));
    setCarbs(calculateMacros(food.carbohydrates, _quantity));
    setSugar(calculateMacros(food.sugar, _quantity));
    setFats(calculateMacros(food.fats, _quantity));
    setSaturatedFats(calculateMacros(food.saturated_fats, _quantity));
    setProtein(calculateMacros(food.protein, _quantity));
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
      isCustomFood={true}
      userFood={undefined}
      created_at={undefined}
    />
  );
}
