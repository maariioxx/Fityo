import { CustomFoods } from '../foods/customFoods';
import { FoodNutrients } from './nutritionInstantEndpoint';
import { ParsedFood } from './nutritionSearchEndpoint';

export type FetchedFood = {
  calories: number;
  carbs: number;
  created_at: string;
  date: string;
  fats: number;
  food_id: string;
  id: string;
  name: string;
  protein: number;
  quantity: number;
  saturated_fats: number;
  sugar: number;
  user_id: string;
};

type Nutrients = {
  quantity: number;
  calories: number;
  carbs: number;
  sugar: number;
  fats: number;
  saturated_fats: number;
  protein: number;
};

type AddFood = {
  food: ParsedFood;
  handleQuantityChange: (quantityInput: number) => void;
  date: string;
  userFood: undefined;
  isUserFood: false;
  isCustomFood: false;
  created_at: undefined;
};

type CustomFood = {
  food: CustomFoods;
  handleQuantityChange: (quantityInput: number) => void;
  date: string;
  userFood: undefined;
  isUserFood: false;
  isCustomFood: true;
  created_at: undefined;
};

type UserFood = {
  food?: undefined;
  handleQuantityChange?: undefined;
  date: string;
  userFood: FetchedFood;
  isUserFood: true;
  isCustomFood: false;
  created_at: string;
};

export type FoodsRow =
  | (AddFood & Nutrients)
  | (CustomFood & Nutrients)
  | (UserFood & Nutrients);
