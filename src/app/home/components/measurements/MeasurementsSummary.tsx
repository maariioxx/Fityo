'use client';

import { addMeasurements } from '@/lib/actions';
import { useState } from 'react';
import { Button } from 'flowbite-react';
import { MdAdd, MdClose, MdEdit } from 'react-icons/md';
import { TodayMeasurements } from '@/types/API/measurementssummary';

const FORM_FIELDS = ['weight', 'neck', 'chest', 'arm', 'belly', 'leg'] as const;
const SHOW_INPUT = [false, false, false, false, false, false];

export default function MeasurementsSummary({
  todayMeasurements,
}: {
  todayMeasurements: TodayMeasurements;
}) {
  const [showInputs, setShowInputs] = useState(SHOW_INPUT);
  return (
    <form
      action={addMeasurements}
      className="flex flex-col gap-4 w-4/5 lg:w-auto lg:max-w-sm"
    >
      {FORM_FIELDS.map((field, index) => {
        return (
          <label key={index} className="relative grid grid-cols-2 space-x-12">
            <div className="grid grid-cols-3 gap-8 items-center">
              {field[0].toUpperCase() + field.slice(1)}:
              <span
                className={`p-2 mr-8 ${
                  typeof todayMeasurements !== 'undefined' &&
                  todayMeasurements[`${field}`] !== ''
                    ? 'block'
                    : 'invisible'
                }`}
              >
                {typeof todayMeasurements !== 'undefined' &&
                  todayMeasurements[`${field}`]}
                {index === 0 ? 'kg' : 'cm'}
              </span>
              <Button
                color="success"
                className="max-w-16 !px-4 !ml-6"
                aria-label="Open or close measure input"
                onClick={() =>
                  setShowInputs(
                    showInputs.map((value, i) => {
                      if (i === index) return !value;
                      else return value;
                    })
                  )
                }
              >
                {showInputs[index] ? (
                  <MdClose className="text-2xl pointer-events-none" />
                ) : typeof todayMeasurements !== 'undefined' &&
                  todayMeasurements[`${field}`] !== '' ? (
                  <MdEdit className="text-2xl pointer-events-none" />
                ) : (
                  <MdAdd className="text-2xl pointer-events-none" />
                )}
              </Button>
            </div>
            <input
              type="number"
              name={field}
              max={1000}
              defaultValue={
                typeof todayMeasurements !== 'undefined' &&
                todayMeasurements[`${field}`] !== ''
                  ? todayMeasurements[`${field}`]
                  : ''
              }
              step="0.01"
              className={`form-input number-input max-w-24 ${
                showInputs[index]
                  ? 'scale-100 translate-x-0'
                  : 'scale-0 -translate-x-8'
              } transition-transform`}
            />
            <span
              className={`absolute top-3 right-8 md:right-40 lg:right-14 text-sm text-gray-400 ${
                showInputs[index]
                  ? 'scale-100 translate-x-0'
                  : 'scale-0 -translate-x-8'
              } transition-transform`}
            >
              {index === 0 ? 'kg' : 'cm'}
            </span>
          </label>
        );
      })}
      <Button type="submit" color="success" className="max-w-36">
        Update
      </Button>
    </form>
  );
}
