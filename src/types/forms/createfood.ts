import { z } from 'zod';

export const createFoodSchema = z.object({
  name: z.string(),
  quantity: z.coerce.number(),
  calories: z.coerce.number(),
  carbohydrates: z.coerce.number(),
  sugar: z.coerce.number(),
  fats: z.coerce.number(),
  saturated_fats: z.coerce.number(),
  protein: z.coerce.number(),
});

export type TCreateFoodSchema = z.infer<typeof createFoodSchema>;
