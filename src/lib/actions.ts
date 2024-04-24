'use server';

import { TSignUpSchema, signUpSchema } from '@/types/forms/signup';
import { supabase } from '../../supabase';
import {
  totalNutritionSchema,
  dailyNutritionSchema,
} from '@/types/forms/nutritionsetup';
import {
  checkIfEmailExists,
  checkIfUsernameExists,
  formatBirthdateToDb,
  formatDateToDB,
  getMeasurementsByDate,
  getUser,
} from './utils';
import { revalidatePath } from 'next/cache';
import { TAddFoodSchema, addFoodSchema } from '@/types/actions/addfood';
import moment from 'moment';
import { redirect } from 'next/navigation';
import {
  TUpdateFoodSchema,
  updateFoodSchema,
} from '@/types/actions/updatefood';
import { TCreateFoodSchema, createFoodSchema } from '@/types/forms/createfood';
import { TEditProfile, editProfileSchema } from '@/types/forms/editprofile';
import { User } from '@/app/home/settings/components/Form';
import { Session } from 'next-auth';

export async function signUp(email: string, formData: TSignUpSchema) {
  const result = signUpSchema.safeParse(formData);
  if (!result.success) return { status: 400, message: result.error };
  const usernameValidation = await checkIfUsernameExists(result.data.username);
  if (!usernameValidation)
    return { status: 400, message: 'Username already exists' };
  const authUser = await supabase
    .schema('next_auth')
    .from('users')
    .select('id')
    .eq('email', email);
  if (authUser.data?.length === 0) return redirect('/signup');
  const formattedDate = formatBirthdateToDb(
    result.data.birthdate.toISOString()
  );
  const register = await supabase.schema('fityo').from('users').insert({
    auth_user_id: authUser.data![0].id,
    username: result.data.username,
    birthdate: formattedDate,
    genre: result.data.genre,
  });
  return redirect('/home');
}

export async function editProfile(
  user: User,
  session: Session,
  data: TEditProfile
) {
  const result = editProfileSchema.safeParse(data);
  if (!result.success) return { status: 400, message: result.error };
  const usernameValidation = await checkIfUsernameExists(result.data.username);
  if (!usernameValidation && result.data.username !== user?.username)
    return { status: 400, message: 'Username already exists' };
  const emailValidation = await checkIfEmailExists(result.data.email);
  if (!emailValidation && result.data.email !== session?.user?.email)
    return { status: 400, message: 'Email already exists' };
  console.log(result.data);
  const sessionUpdate = await supabase
    .schema('next_auth')
    .from('users')
    .update({
      email: result.data.email,
      name: result.data.name,
    })
    .eq('email', session.user!.email!);
  const userUpdate = await supabase
    .schema('fityo')
    .from('users')
    .update({
      username: result.data.username,
    })
    .eq('id', user.userId);
  if (sessionUpdate.status === 204 && userUpdate.status === 204) {
    revalidatePath('/home');
    return redirect('/home');
  }
}

// NUTRITION SETUP

export async function setupTotalNutrition(
  prevState: { message: string },
  formData: FormData
) {
  const result = totalNutritionSchema.safeParse({
    total_calories: formData.get('total_calories'),
    total_carbohidrates: formData.get('total_carbohidrates'),
    total_fats: formData.get('total_fats'),
    total_protein: formData.get('total_protein'),
  });
  if (!result.success) {
    return { message: 'Something went wrong' };
  }
  const user = await getUser();
  if (!user) return { message: 'User does not exist' };
  const caloriesInsert = await supabase
    .schema('nutrition')
    .from('calories_info')
    .insert({
      total_calories: result.data.total_calories,
      user_id: user?.userId,
    });
  const carbosInsert = await supabase
    .schema('nutrition')
    .from('carbohidrates_info')
    .insert({
      total_carbohidrates: result.data.total_carbohidrates,
      user_id: user?.userId,
    });
  const fatsInsert = await supabase
    .schema('nutrition')
    .from('fats_info')
    .insert({
      total_fats: result.data.total_fats,
      user_id: user?.userId,
    });
  const proteinInsert = await supabase
    .schema('nutrition')
    .from('protein_info')
    .insert({
      total_protein: result.data.total_protein,
      user_id: user?.userId,
    });
  if (
    caloriesInsert.status === 201 &&
    carbosInsert.status === 201 &&
    fatsInsert.status === 201 &&
    proteinInsert.status === 201
  ) {
    revalidatePath('/home');
    return { message: '' };
  }
  return { message: 'Something went wrong' };
}

export async function editTotalNutrition(
  prevState: { message: string },
  formData: FormData
) {
  const result = totalNutritionSchema.safeParse({
    total_calories: formData.get('total_calories'),
    total_carbohidrates: formData.get('total_carbohidrates'),
    total_fats: formData.get('total_fats'),
    total_protein: formData.get('total_protein'),
  });
  if (!result.success) {
    return { message: 'Something went wrong' };
  }
  const user = await getUser();
  if (!user) return { message: 'User does not exist' };
  const caloriesInsert = await supabase
    .schema('nutrition')
    .from('calories_info')
    .update({
      total_calories: result.data.total_calories,
      monday_calories: null,
      tuesday_calories: null,
      wednesday_calories: null,
      thursday_calories: null,
      friday_calories: null,
      saturday_calories: null,
      sunday_calories: null,
    })
    .eq('user_id', user.userId);
  const carbosInsert = await supabase
    .schema('nutrition')
    .from('carbohidrates_info')
    .update({
      total_carbohidrates: result.data.total_carbohidrates,
      monday_carbohidrates: null,
      tuesday_carbohidrates: null,
      wednesday_carbohidrates: null,
      thursday_carbohidrates: null,
      friday_carbohidrates: null,
      saturday_carbohidrates: null,
      sunday_carbohidrates: null,
    })
    .eq('user_id', user.userId);
  const fatsInsert = await supabase
    .schema('nutrition')
    .from('fats_info')
    .update({
      total_fats: result.data.total_fats,
      monday_fats: null,
      tuesday_fats: null,
      wednesday_fats: null,
      thursday_fats: null,
      friday_fats: null,
      saturday_fats: null,
      sunday_fats: null,
    })
    .eq('user_id', user.userId);
  const proteinInsert = await supabase
    .schema('nutrition')
    .from('protein_info')
    .update({
      total_protein: result.data.total_protein,
      monday_protein: null,
      tuesday_protein: null,
      wednesday_protein: null,
      thursday_protein: null,
      friday_protein: null,
      saturday_protein: null,
      sunday_protein: null,
    })
    .eq('user_id', user.userId);
  console.log(caloriesInsert, carbosInsert, fatsInsert, proteinInsert);
  if (
    caloriesInsert.status === 204 &&
    carbosInsert.status === 204 &&
    fatsInsert.status === 204 &&
    proteinInsert.status === 204
  ) {
    revalidatePath('/home');
    redirect('/home/nutrition');
  }
  return { message: 'Something went wrong' };
}

export async function setupDailyNutrition(
  prevState: { message: string },
  formData: FormData
) {
  const user = await getUser();
  const rawFormData = Object.fromEntries(formData.entries());
  const result = dailyNutritionSchema.safeParse(rawFormData);
  if (!result.success) return { message: 'Something went wrong' };
  const caloriesInsert = await supabase
    .schema('nutrition')
    .from('calories_info')
    .upsert({
      monday_calories: result.data.monday_calories as number,
      tuesday_calories: result.data.tuesday_calories as number,
      wednesday_calories: result.data.wednesday_calories as number,
      thursday_calories: result.data.thursday_calories as number,
      friday_calories: result.data.friday_calories as number,
      saturday_calories: result.data.saturday_calories as number,
      sunday_calories: result.data.sunday_calories as number,
      user_id: user?.userId as string,
    })
    .eq('user_id', user!.userId);
  const carbosInsert = await supabase
    .schema('nutrition')
    .from('carbohidrates_info')
    .upsert({
      monday_carbohidrates: result.data.monday_carbohidrates as number,
      tuesday_carbohidrates: result.data.tuesday_carbohidrates as number,
      wednesday_carbohidrates: result.data.wednesday_carbohidrates as number,
      thursday_carbohidrates: result.data.thursday_carbohidrates as number,
      friday_carbohidrates: result.data.friday_carbohidrates as number,
      saturday_carbohidrates: result.data.saturday_carbohidrates as number,
      sunday_carbohidrates: result.data.sunday_carbohidrates as number,
      user_id: user?.userId as string,
    })
    .eq('user_id', user!.userId);
  const fatsInsert = await supabase
    .schema('nutrition')
    .from('fats_info')
    .upsert({
      monday_fats: result.data.monday_fats as number,
      tuesday_fats: result.data.tuesday_fats as number,
      wednesday_fats: result.data.wednesday_fats as number,
      thursday_fats: result.data.thursday_fats as number,
      friday_fats: result.data.friday_fats as number,
      saturday_fats: result.data.saturday_fats as number,
      sunday_fats: result.data.sunday_fats as number,
      user_id: user?.userId as string,
    })
    .eq('user_id', user!.userId);
  const proteinInsert = await supabase
    .schema('nutrition')
    .from('protein_info')
    .upsert(
      {
        monday_protein: result.data.monday_protein as number,
        tuesday_protein: result.data.tuesday_protein as number,
        wednesday_protein: result.data.wednesday_protein as number,
        thursday_protein: result.data.thursday_protein as number,
        friday_protein: result.data.friday_protein as number,
        saturday_protein: result.data.saturday_protein as number,
        sunday_protein: result.data.sunday_protein as number,
        user_id: user?.userId as string,
      },
      { onConflict: 'user_id', ignoreDuplicates: false }
    )
    .eq('user_id', user!.userId);
  console.log(caloriesInsert, carbosInsert, fatsInsert, proteinInsert);
  if (
    caloriesInsert.status === 201 &&
    carbosInsert.status === 201 &&
    fatsInsert.status === 201 &&
    proteinInsert.status === 201
  ) {
    revalidatePath('/home/nutrition');
    return { message: '' };
  }
  return { message: 'Something went wrong' };
}

export async function editDailyNutrition(
  prevState: { message: string },
  formData: FormData
) {
  const user = await getUser();
  const rawFormData = Object.fromEntries(formData.entries());
  const result = dailyNutritionSchema.safeParse(rawFormData);
  if (!result.success) return { message: 'Something went wrong' };
  const caloriesInsert = await supabase
    .schema('nutrition')
    .from('calories_info')
    .update({
      total_calories: null,
      monday_calories: result.data.monday_calories as number,
      tuesday_calories: result.data.tuesday_calories as number,
      wednesday_calories: result.data.wednesday_calories as number,
      thursday_calories: result.data.thursday_calories as number,
      friday_calories: result.data.friday_calories as number,
      saturday_calories: result.data.saturday_calories as number,
      sunday_calories: result.data.sunday_calories as number,
    })
    .eq('user_id', user!.userId);
  const carbosInsert = await supabase
    .schema('nutrition')
    .from('carbohidrates_info')
    .update({
      total_carbohidrates: null,
      monday_carbohidrates: result.data.monday_carbohidrates as number,
      tuesday_carbohidrates: result.data.tuesday_carbohidrates as number,
      wednesday_carbohidrates: result.data.wednesday_carbohidrates as number,
      thursday_carbohidrates: result.data.thursday_carbohidrates as number,
      friday_carbohidrates: result.data.friday_carbohidrates as number,
      saturday_carbohidrates: result.data.saturday_carbohidrates as number,
      sunday_carbohidrates: result.data.sunday_carbohidrates as number,
    })
    .eq('user_id', user!.userId);
  const fatsInsert = await supabase
    .schema('nutrition')
    .from('fats_info')
    .update({
      total_fats: null,
      monday_fats: result.data.monday_fats as number,
      tuesday_fats: result.data.tuesday_fats as number,
      wednesday_fats: result.data.wednesday_fats as number,
      thursday_fats: result.data.thursday_fats as number,
      friday_fats: result.data.friday_fats as number,
      saturday_fats: result.data.saturday_fats as number,
      sunday_fats: result.data.sunday_fats as number,
    })
    .eq('user_id', user!.userId);
  const proteinInsert = await supabase
    .schema('nutrition')
    .from('protein_info')
    .update({
      total_protein: null,
      monday_protein: result.data.monday_protein as number,
      tuesday_protein: result.data.tuesday_protein as number,
      wednesday_protein: result.data.wednesday_protein as number,
      thursday_protein: result.data.thursday_protein as number,
      friday_protein: result.data.friday_protein as number,
      saturday_protein: result.data.saturday_protein as number,
      sunday_protein: result.data.sunday_protein as number,
    })
    .eq('user_id', user!.userId);
  console.log(caloriesInsert, carbosInsert, fatsInsert, proteinInsert);
  if (
    caloriesInsert.status === 204 &&
    carbosInsert.status === 204 &&
    fatsInsert.status === 204 &&
    proteinInsert.status === 204
  ) {
    revalidatePath('/home/');
    redirect('/home/nutrition');
  }
  return { message: 'Something went wrong' };
}

// MEASURES

export async function setupMeasurements(formData: FormData) {
  const user = await getUser();
  const rawFormData = Object.fromEntries(formData);
  console.log(rawFormData);
  let atLeastOneFieldFilled = false;
  for (const field in rawFormData) {
    if (field !== 'date' && rawFormData[field] !== '') {
      atLeastOneFieldFilled = true;
    }
  }
  if (!atLeastOneFieldFilled) return;
  const insert = await supabase
    .schema('fityo')
    .from('measures')
    .insert({
      user_id: user!.userId as string,
      height: rawFormData.height as string,
      weight: rawFormData.weight as string,
      neck: rawFormData.neck as string,
      chest: rawFormData.chest as string,
      arm: rawFormData.arm as string,
      belly: rawFormData.belly as string,
      leg: rawFormData.leg as string,
      date: rawFormData.date as string,
    });
  revalidatePath('/home');
}

export async function addMeasurements(formData: FormData) {
  const user = await getUser();
  const today = moment().format('YYYY-MM-DD');
  const rawFormData = Object.fromEntries(formData);
  const todayMeasurements = await getMeasurementsByDate(
    moment().format('YYYY-MM-DD')
  );
  console.log(rawFormData);
  let atLeastOneFieldFilled = false;
  for (const field in rawFormData) {
    if (rawFormData[field] !== '') {
      atLeastOneFieldFilled = true;
    }
  }
  if (!atLeastOneFieldFilled) return;
  if (typeof todayMeasurements === 'undefined') {
    const insert = await supabase
      .schema('fityo')
      .from('measures')
      .insert({
        user_id: user!.userId as string,
        weight: rawFormData.weight as string,
        neck: rawFormData.neck as string,
        chest: rawFormData.chest as string,
        arm: rawFormData.arm as string,
        belly: rawFormData.belly as string,
        leg: rawFormData.leg as string,
        date: today,
      });
  } else {
    const update = await supabase
      .schema('fityo')
      .from('measures')
      .update({
        user_id: user!.userId as string,
        weight: rawFormData.weight as string,
        neck: rawFormData.neck as string,
        chest: rawFormData.chest as string,
        arm: rawFormData.arm as string,
        belly: rawFormData.belly as string,
        leg: rawFormData.leg as string,
        date: today,
      })
      .eq('user_id', user!.userId)
      .eq('date', today);
  }

  revalidatePath('/home');
}

// USER'S DIARY FOODS

export async function addFood({ data }: { data: TAddFoodSchema }) {
  const user = await getUser();
  const result = addFoodSchema.safeParse(data);
  if (!result.success) return { message: 'Something went wrong' };
  const formattedDate = formatDateToDB(result.data.date);
  const insert = await supabase.schema('nutrition').from('diets_foods').insert({
    name: result.data.name,
    date: formattedDate,
    food_id: result.data.food_id.toString(),
    quantity: result.data.quantity,
    calories: result.data.calories,
    carbs: result.data.carbs,
    sugar: result.data.sugar,
    fats: result.data.fats,
    saturated_fats: result.data.saturated_fats,
    protein: result.data.protein,
    user_id: user?.userId,
  });
  if (insert.error) return { message: insert.error };
  revalidatePath('/home');
  return { message: 'Success' };
}

export async function deleteFood({
  date,
  created_at,
}: {
  date: string;
  created_at: string;
}) {
  const user = await getUser();
  if (!user || typeof user.userId === 'undefined') redirect('/signup');
  const deletedFood = await supabase
    .schema('nutrition')
    .from('diets_foods')
    .delete()
    .eq('date', date)
    .eq('created_at', created_at)
    .eq('user_id', user.userId);
  if (deletedFood.status === 204) revalidatePath('/home');
}

export async function updateFood({ data }: { data: TUpdateFoodSchema }) {
  const user = await getUser();
  const result = updateFoodSchema.safeParse(data);
  if (!result.success) return { message: result.error };
  const formattedDate = formatDateToDB(result.data.date);
  const update = await supabase
    .schema('nutrition')
    .from('diets_foods')
    .update({
      quantity: result.data.newQuantity,
      calories: result.data.calories,
      carbs: result.data.carbs,
      sugar: result.data.sugar,
      fats: result.data.fats,
      saturated_fats: result.data.saturated_fats,
      protein: result.data.protein,
    })
    .eq('date', formattedDate)
    .eq('created_at', result.data.created_at)
    .eq('user_id', user!.userId);
  if (update.status === 204) {
    revalidatePath('/home');
    return { message: 'Success' };
  }
  return { message: update.error };
}

// CUSTOM FOODS

export async function createCustomFood(data: TCreateFoodSchema) {
  const result = createFoodSchema.safeParse(data);
  if (!result.success) return;
  console.log(result);
  const user = await getUser();
  const insert = await supabase
    .schema('nutrition')
    .from('custom_foods')
    .insert({
      name: result.data.name,
      quantity: result.data.quantity,
      calories: result.data.calories,
      carbohydrates: result.data.carbohydrates,
      sugar: result.data.sugar,
      fats: result.data.fats,
      saturated_fats: result.data.saturated_fats,
      protein: result.data.protein,
      user_id: user!.userId,
    });
  if (insert.statusText === 'Created') {
    revalidatePath('/home/nutrition');
    return true;
  }
  return false;
}

export async function deleteCustomFood(foodId: number) {
  const user = await getUser();
  const remove = await supabase
    .schema('nutrition')
    .from('custom_foods')
    .delete()
    .eq('id', foodId)
    .eq('user_id', user!.userId);
  if (remove.statusText === 'No Content') {
    revalidatePath('/home/nutrition');
    return true;
  }
  return false;
}
