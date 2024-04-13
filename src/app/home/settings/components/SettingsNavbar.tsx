import { Button } from 'flowbite-react';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

export default function SettingsNavbar({
  showNutrition,
  setShowNutrition,
}: {
  showNutrition: boolean;
  setShowNutrition: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className={`${!showNutrition && 'pb-8'}`}>
      <div className="flex justify-evenly gap-4 pb-2">
        <Button
          onClick={() => setShowNutrition(false)}
          color={`${!showNutrition ? 'success' : 'light'}`}
          className="text-xl py-0.5 px-1 rounded-xl transition-colors"
        >
          Account
        </Button>
        <Button
          onClick={() => setShowNutrition(true)}
          color={`${showNutrition ? 'success' : 'light'}`}
          className="text-xl py-0.5 px-1 rounded-xl transition-colors"
        >
          Nutrition
        </Button>
      </div>
      <hr />
    </div>
  );
}
