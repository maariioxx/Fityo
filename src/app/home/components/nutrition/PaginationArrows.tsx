'use client';

import { Button } from 'flowbite-react';
import moment from 'moment';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function PaginationArrows({ date }: { date: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleDayChange(direction: string) {
    const params = new URLSearchParams(searchParams);
    if (direction === 'before') {
      const newDate = moment(date, 'DD/MM/YYYY')
        .subtract(1, 'days')
        .format('DD/MM/YYYY');
      params.set('date', newDate);
    } else if (direction === 'after') {
      const newDate = moment(date, 'DD/MM/YYYY')
        .add(1, 'days')
        .format('DD/MM/YYYY');
      params.set('date', newDate);
    } else if (direction === 'today') {
      const newDate = moment().format('DD/MM/YYYY');
      params.set('date', newDate);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-4 items-center">
      <Button
        size="xs"
        color="success"
        onClick={() => handleDayChange('before')}
        className="z-0"
      >
        {<MdKeyboardArrowLeft className="text-2xl" />}
      </Button>
      <p>{date}</p>
      <Button
        size="xs"
        color="success"
        onClick={() => handleDayChange('after')}
      >
        {<MdKeyboardArrowRight className="text-2xl" />}
      </Button>
      <Button
        size="sm"
        color="success"
        onClick={() => handleDayChange('today')}
      >
        Today
      </Button>
    </div>
  );
}
