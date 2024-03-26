import { z } from 'zod';

export const updateFoodSchema = z.object({
  date: z.string(),
  created_at: z.string(),
  newQuantity: z.coerce.number(),
  calories: z.coerce.number(),
  carbs: z.coerce.number(),
  sugar: z.coerce.number(),
  fats: z.coerce.number(),
  saturated_fats: z.coerce.number(),
  protein: z.coerce.number(),
});

export type TUpdateFoodSchema = z.infer<typeof updateFoodSchema>;
