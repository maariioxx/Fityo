'use client';
import { Button, Tooltip, Checkbox } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { editDailyNutrition, setupDailyNutrition } from '@/lib/actions';
import { FORM_FIELDS, FORM_TOTAL, DAYS_FROM_TOTAL } from '../utils/formFields';
import { useFormState } from 'react-dom';

export default function Form({ update }: { update: boolean }) {
  const [total, setTotal] = useState(FORM_TOTAL);
  const [state, formAction] = useFormState(
    update ? editDailyNutrition : setupDailyNutrition,
    {
      message: '',
    }
  );

  function onChangeTotal(
    name: 'totalCalories' | 'totalCarbohidrates' | 'totalFats' | 'totalProtein',
    value: string
  ) {
    if (total[name] !== value) {
      setTotal((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  const [daysUseTotal, setDaysUseTotal] = useState(DAYS_FROM_TOTAL);

  const onChangeDaysUseTotal = (name: string, value: boolean) => {
    setDaysUseTotal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [days, setDays] = useState(FORM_FIELDS);

  const onChangeDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDays((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    onChangeTotal(
      'totalCalories',
      (
        Number(total.totalCarbohidrates) * 4 +
        Number(total.totalFats) * 9 +
        Number(total.totalProtein) * 4
      ).toString()
    );
  }, [total]);

  return (
    <>
      <form
        action={formAction}
        className="relative grid grid-cols-[1fr,150px,150px,150px,200px] grid-rows-9 gap-4"
      >
        <p className="self-center justify-self-end pr-10">Calories</p>
        <p className="self-center justify-self-center">Carbohidrates</p>
        <p className="self-center justify-self-center">Fats</p>
        <p className="self-center justify-self-center">Protein</p>
        <p className="self-center justify-self-center">Use macros from total</p>
        <label className="grid grid-cols-[50px,150px] items-center gap-16 col-start-1">
          <span>Total</span>
          <input
            type="number"
            readOnly
            value={total.totalCalories}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            onChange={(e) => {
              onChangeTotal('totalCarbohidrates', e.target.value);
            }}
            value={total.totalCarbohidrates}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            onChange={(e) => {
              onChangeTotal('totalFats', e.target.value);
            }}
            value={total.totalFats}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            onChange={(e) => {
              onChangeTotal('totalProtein', e.target.value);
            }}
            value={total.totalProtein}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="grid grid-cols-[50px,150px] items-center gap-16 col-start-1">
          Monday
          <input
            name="monday_calories"
            readOnly
            value={
              daysUseTotal.mondayFromTotal
                ? total.totalCalories
                : (
                    Number(days.monday_carbohidrates) * 4 +
                    Number(days.monday_fats) * 9 +
                    Number(days.monday_protein) * 4
                  ).toString()
            }
            onChange={onChangeDays}
            type="number"
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            name="monday_carbohidrates"
            value={
              daysUseTotal.mondayFromTotal
                ? total.totalCarbohidrates
                : days.monday_carbohidrates
            }
            onChange={onChangeDays}
            type="number"
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            name="monday_fats"
            value={
              daysUseTotal.mondayFromTotal ? total.totalFats : days.monday_fats
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            name="monday_protein"
            value={
              daysUseTotal.mondayFromTotal
                ? total.totalProtein
                : days.monday_protein
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="flex items-center justify-center">
          <Checkbox
            color="success"
            onClick={() =>
              onChangeDaysUseTotal(
                'mondayFromTotal',
                !daysUseTotal.mondayFromTotal
              )
            }
            className="col-start-5"
          />
        </label>
        <label className="grid grid-cols-[50px,150px] items-center gap-16 col-start-1">
          Tuesday
          <input
            name="tuesday_calories"
            readOnly
            value={
              daysUseTotal.tuesdayFromTotal
                ? total.totalCalories
                : (
                    Number(days.tuesday_carbohidrates) * 4 +
                    Number(days.tuesday_fats) * 9 +
                    Number(days.tuesday_protein) * 4
                  ).toString()
            }
            onChange={onChangeDays}
            type="number"
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            name="tuesday_carbohidrates"
            value={
              daysUseTotal.tuesdayFromTotal
                ? total.totalCarbohidrates
                : days.tuesday_carbohidrates
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            name="tuesday_fats"
            value={
              daysUseTotal.tuesdayFromTotal
                ? total.totalFats
                : days.tuesday_fats
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            name="tuesday_protein"
            value={
              daysUseTotal.tuesdayFromTotal
                ? total.totalProtein
                : days.tuesday_protein
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="flex items-center justify-center">
          <Checkbox
            color="success"
            onClick={() =>
              onChangeDaysUseTotal(
                'tuesdayFromTotal',
                !daysUseTotal.tuesdayFromTotal
              )
            }
            className="col-start-5"
          />
        </label>
        <label className="grid grid-cols-[50px,150px] items-center gap-16 col-start-1">
          Wednesday
          <input
            name="wednesday_calories"
            readOnly
            value={
              daysUseTotal.wednesdayFromTotal
                ? total.totalCalories
                : (
                    Number(days.wednesday_carbohidrates) * 4 +
                    Number(days.wednesday_fats) * 9 +
                    Number(days.wednesday_protein) * 4
                  ).toString()
            }
            onChange={onChangeDays}
            type="number"
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            name="wednesday_carbohidrates"
            value={
              daysUseTotal.wednesdayFromTotal
                ? total.totalCarbohidrates
                : days.wednesday_carbohidrates
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            name="wednesday_fats"
            value={
              daysUseTotal.wednesdayFromTotal
                ? total.totalFats
                : days.wednesday_fats
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            name="wednesday_protein"
            value={
              daysUseTotal.wednesdayFromTotal
                ? total.totalProtein
                : days.wednesday_protein
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="flex items-center justify-center">
          <Checkbox
            color="success"
            onClick={() =>
              onChangeDaysUseTotal(
                'wednesdayFromTotal',
                !daysUseTotal.wednesdayFromTotal
              )
            }
            className="col-start-5"
          />
        </label>
        <label className="grid grid-cols-[50px,150px] items-center gap-16 col-start-1">
          Thursday
          <input
            name="thursday_calories"
            readOnly
            value={
              daysUseTotal.thursdayFromTotal
                ? total.totalCalories
                : (
                    Number(days.thursday_carbohidrates) * 4 +
                    Number(days.thursday_fats) * 9 +
                    Number(days.thursday_protein) * 4
                  ).toString()
            }
            onChange={onChangeDays}
            type="number"
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            name="thursday_carbohidrates"
            value={
              daysUseTotal.thursdayFromTotal
                ? total.totalCarbohidrates
                : days.thursday_carbohidrates
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            name="thursday_fats"
            value={
              daysUseTotal.thursdayFromTotal
                ? total.totalFats
                : days.thursday_fats
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            name="thursday_protein"
            value={
              daysUseTotal.thursdayFromTotal
                ? total.totalProtein
                : days.thursday_protein
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="flex items-center justify-center">
          <Checkbox
            color="success"
            onClick={() =>
              onChangeDaysUseTotal(
                'thursdayFromTotal',
                !daysUseTotal.thursdayFromTotal
              )
            }
            className="col-start-5"
          />
        </label>
        <label className="grid grid-cols-[50px,150px] items-center gap-16 col-start-1">
          Friday
          <input
            name="friday_calories"
            readOnly
            value={
              daysUseTotal.fridayFromTotal
                ? total.totalCalories
                : (
                    Number(days.friday_carbohidrates) * 4 +
                    Number(days.friday_fats) * 9 +
                    Number(days.friday_protein) * 4
                  ).toString()
            }
            onChange={onChangeDays}
            type="number"
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            name="friday_carbohidrates"
            value={
              daysUseTotal.fridayFromTotal
                ? total.totalCarbohidrates
                : days.friday_carbohidrates
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            name="friday_fats"
            value={
              daysUseTotal.fridayFromTotal ? total.totalFats : days.friday_fats
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            name="friday_protein"
            value={
              daysUseTotal.fridayFromTotal
                ? total.totalProtein
                : days.friday_protein
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="flex items-center justify-center">
          <Checkbox
            color="success"
            onClick={() =>
              onChangeDaysUseTotal(
                'fridayFromTotal',
                !daysUseTotal.fridayFromTotal
              )
            }
            className="col-start-5"
          />
        </label>
        <label className="grid grid-cols-[50px,150px] items-center gap-16 col-start-1">
          Saturday
          <input
            name="saturday_calories"
            readOnly
            value={
              daysUseTotal.saturdayFromTotal
                ? total.totalCalories
                : (
                    Number(days.saturday_carbohidrates) * 4 +
                    Number(days.saturday_fats) * 9 +
                    Number(days.saturday_protein) * 4
                  ).toString()
            }
            onChange={onChangeDays}
            type="number"
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            name="saturday_carbohidrates"
            value={
              daysUseTotal.saturdayFromTotal
                ? total.totalCarbohidrates
                : days.saturday_carbohidrates
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            name="saturday_fats"
            value={
              daysUseTotal.saturdayFromTotal
                ? total.totalFats
                : days.saturday_fats
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="w-[150px]">
          <input
            type="number"
            name="saturday_protein"
            value={
              daysUseTotal.saturdayFromTotal
                ? total.totalProtein
                : days.saturday_protein
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="flex items-center justify-center">
          <Checkbox
            color="success"
            onClick={() =>
              onChangeDaysUseTotal(
                'saturdayFromTotal',
                !daysUseTotal.saturdayFromTotal
              )
            }
            className="col-start-5"
          />
        </label>
        <label className="row-start-9 grid grid-cols-[50px,150px] items-center gap-16 col-start-1">
          Sunday
          <input
            name="sunday_calories"
            readOnly
            value={
              daysUseTotal.sundayFromTotal
                ? total.totalCalories
                : (
                    Number(days.sunday_carbohidrates) * 4 +
                    Number(days.sunday_fats) * 9 +
                    Number(days.sunday_protein) * 4
                  ).toString()
            }
            onChange={onChangeDays}
            type="number"
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="row-start-9 w-[150px]">
          <input
            type="number"
            name="sunday_carbohidrates"
            value={
              daysUseTotal.sundayFromTotal
                ? total.totalCarbohidrates
                : days.sunday_carbohidrates
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="row-start-9 w-[150px]">
          <input
            type="number"
            name="sunday_fats"
            value={
              daysUseTotal.sundayFromTotal ? total.totalFats : days.sunday_fats
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="row-start-9 w-[150px]">
          <input
            type="number"
            name="sunday_protein"
            value={
              daysUseTotal.sundayFromTotal
                ? total.totalProtein
                : days.sunday_protein
            }
            onChange={onChangeDays}
            className="form-input number-input w-[150px]"
          />
        </label>
        <label className="flex items-center justify-center">
          <Checkbox
            color="success"
            onClick={() =>
              onChangeDaysUseTotal(
                'sundayFromTotal',
                !daysUseTotal.sundayFromTotal
              )
            }
            className="col-start-5"
          />
        </label>
        <Button
          color="success"
          type="submit"
          size="lg"
          className="absolute left-96 -bottom-20"
        >
          Submit
        </Button>
      </form>
      {state.message !== '' ? (
        <p className="number-red-500 pl-12">{state.message}</p>
      ) : (
        ''
      )}
    </>
  );
}
