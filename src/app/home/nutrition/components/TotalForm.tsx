'use client';

import { useState } from 'react';
import { Button } from 'flowbite-react';
import { editTotalNutrition } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { Tooltip } from 'flowbite-react';

export default function Form({ update }: { update: boolean }) {
  const [state, formAction] = useFormState(
    update ? editTotalNutrition : editTotalNutrition,
    {
      message: '',
    }
  );

  const [carbos, setCarbos] = useState(0);
  const [fats, setFats] = useState(0);
  const [protein, setProtein] = useState(0);

  return (
    <form action={formAction} className="flex flex-col items-center gap-8">
      <label className="grid grid-cols-2 items-center gap-8">
        <span className="col-start-1 col-end-2">Calories</span>
        <Tooltip content="Calculated from your macros">
          <input
            name="total_calories"
            className="form-input py-2 pl-3 max-w-28 col-start-2 col-end-3"
            readOnly
            value={carbos * 4 + fats * 9 + protein * 4}
          />
        </Tooltip>
      </label>
      <label className="relative grid grid-cols-2 items-center gap-8">
        <span>Carbohydrates</span>
        <input
          name="total_carbohidrates"
          type="number"
          onChange={(e) => {
            setCarbos(Number(e.target.value));
          }}
          value={carbos}
          className="form-input max-w-28 number-input"
        />
        <span className="absolute right-5 bottom-[0.8rem]">g</span>
      </label>
      <label className="relative grid grid-cols-2 items-center gap-8">
        <span>Fats</span>
        <input
          name="total_fats"
          type="number"
          onChange={(e) => {
            setFats(Number(e.target.value));
          }}
          value={fats}
          className="form-input max-w-28 number-input"
        />
        <span className="absolute right-3 bottom-[0.8rem]">g</span>
      </label>
      <label className="relative grid grid-cols-2 items-center gap-8">
        <span>Protein</span>
        <input
          name="total_protein"
          type="number"
          onChange={(e) => {
            setProtein(Number(e.target.value));
          }}
          value={protein}
          className="form-input max-w-28 number-input"
        />
        <span className="absolute right-3 bottom-[0.8rem]">g</span>
      </label>
      <Button type="submit" color="success">
        Submit
      </Button>
      {state.message !== '' ? (
        <p className="text-red-500">{state.message}</p>
      ) : (
        ''
      )}
    </form>
  );
}
