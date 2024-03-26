export type CustomFoodInput = {
  quantity: number;
  name: string;
  calories: number;
  carbohydrates: number;
  sugar: number;
  fats: number;
  saturated_fats: number;
  protein: number;
};

export type CustomFoods = CustomFoodInput & {
  id: number;
  user_id: string;
};
