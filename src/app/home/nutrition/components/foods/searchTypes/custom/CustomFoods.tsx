'use client';

import { CustomFoods } from '@/types/foods/customFoods';
import { useEffect, useState } from 'react';
import FoodsRow from '../../FoodsRow';

export function calculateMacros(
  macro: number,
  initialQuantity: number,
  quantity: number
) {
  return (macro / initialQuantity) * quantity;
}

export default function CustomFoods({
  food,
  date,
}: {
  food: CustomFoods;
  date: string;
}) {
  const [quantity, setQuantity] = useState(food.quantity);
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
    setCalories(calculateMacros(food.calories, food.quantity, _quantity));
    setCarbs(calculateMacros(food.carbohydrates, food.quantity, _quantity));
    setSugar(calculateMacros(food.sugar, food.quantity, _quantity));
    setFats(calculateMacros(food.fats, food.quantity, _quantity));
    setSaturatedFats(
      calculateMacros(food.saturated_fats, food.quantity, _quantity)
    );
    setProtein(calculateMacros(food.protein, food.quantity, _quantity));
  };

  return (
    <FoodsRow
      food={food}
      foodId={food.id.toString()}
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
