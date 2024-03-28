import { z } from 'zod';

export const addFoodSchema = z.object({
  name: z.string(),
  date: z.string(),
  food_id: z.union([z.coerce.number(), z.string()]),
  quantity: z.coerce.number(),
  calories: z.coerce.number(),
  carbs: z.coerce.number(),
  sugar: z.coerce.number(),
  fats: z.coerce.number(),
  saturated_fats: z.coerce.number(),
  protein: z.coerce.number(),
});

export type TAddFoodSchema = z.infer<typeof addFoodSchema>;
