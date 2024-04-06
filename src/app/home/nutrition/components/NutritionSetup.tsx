'use client';

import { ToggleSwitch, Tooltip } from 'flowbite-react';
import { useState } from 'react';
import DailyForm from './DailyForm';
import TotalForm from './TotalForm';
export default function NutritionSetup({
  update = false,
}: {
  update: boolean;
}) {
  const [dailyNutrition, setDailyNutrition] = useState(false);
  return (
    <div className="py-20 flex flex-col items-center gap-10">
      <div>
        <Tooltip content="Choose between selecting your calories and macros based on a total or changing them depending on the day of the week">
          <ToggleSwitch
            checked={dailyNutrition}
            onChange={setDailyNutrition}
            label="Total / Daily"
            color="success"
          />
        </Tooltip>
      </div>
      {dailyNutrition ? (
        <DailyForm update={update} />
      ) : (
        <TotalForm update={update} />
      )}
    </div>
  );
}
