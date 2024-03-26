import { z } from 'zod';

export const totalNutritionSchema = z.object({
  total_calories: z.coerce.number().min(1).max(10000),
  total_carbohidrates: z.coerce.number().min(1).max(10000),
  total_fats: z.coerce.number().min(1).max(10000),
  total_protein: z.coerce.number().min(1).max(10000),
});

export type TTotalNutritionSchema = z.infer<typeof totalNutritionSchema>;

export const dailyNutritionSchema = z.object({
  monday_calories: z.coerce.number(),
  tuesday_calories: z.coerce.number(),
  wednesday_calories: z.coerce.number(),
  thursday_calories: z.coerce.number(),
  friday_calories: z.coerce.number(),
  saturday_calories: z.coerce.number(),
  sunday_calories: z.coerce.number(),
  monday_carbohidrates: z.coerce.number(),
  tuesday_carbohidrates: z.coerce.number(),
  wednesday_carbohidrates: z.coerce.number(),
  thursday_carbohidrates: z.coerce.number(),
  friday_carbohidrates: z.coerce.number(),
  saturday_carbohidrates: z.coerce.number(),
  sunday_carbohidrates: z.coerce.number(),
  monday_fats: z.coerce.number(),
  tuesday_fats: z.coerce.number(),
  wednesday_fats: z.coerce.number(),
  thursday_fats: z.coerce.number(),
  friday_fats: z.coerce.number(),
  saturday_fats: z.coerce.number(),
  sunday_fats: z.coerce.number(),
  monday_protein: z.coerce.number(),
  tuesday_protein: z.coerce.number(),
  wednesday_protein: z.coerce.number(),
  thursday_protein: z.coerce.number(),
  friday_protein: z.coerce.number(),
  saturday_protein: z.coerce.number(),
  sunday_protein: z.coerce.number(),
});

export type TDailyNutritionSchema = z.infer<typeof dailyNutritionSchema>;

export const nutritionSchema = z.union([
  dailyNutritionSchema,
  totalNutritionSchema,
]);

export type TNutritionSchema = z.infer<typeof nutritionSchema>;
