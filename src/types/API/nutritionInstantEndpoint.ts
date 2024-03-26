export type FoodNutrients = {
  uri: string;
  calories: number;
  totalWeight: number;
  dietLabels: any[];
  healthLabels: string[];
  cautions: any[];
  totalNutrients: { [key: string]: Total };
  totalDaily: { [key: string]: Total };
  ingredients: Ingredient[];
};

export type Ingredient = {
  parsed: Parsed[];
};

export type Parsed = {
  quantity: number;
  measure: string;
  food: string;
  foodId: string;
  weight: number;
  retainedWeight: number;
  measureURI: string;
  status: string;
};

export type Total = {
  label: string;
  quantity: number;
  unit: Unit;
};

export type Unit = '%' | 'mg' | 'g' | 'kcal' | 'µg';
