'use client';

import { MdSearch } from 'react-icons/md';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { ChangeEvent, useState, useEffect } from 'react';

export default function FoodsSearch() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchType, setSearchType] = useState(
    searchParams.get('searchType')?.toString() || 'fityo'
  );

  const handleSearch = useDebouncedCallback((query: string) => {
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  useEffect(() => {
    console.log(searchType);
    if (searchType === 'custom') {
      params.set('searchType', 'custom');
    } else {
      params.delete('searchType');
    }
    replace(`${pathname}?${params.toString()}`);
  }, [searchType]);

  return (
    <div className="flex flex-col items-center gap-2 lg:gap-5">
      <div className="relative">
        <input
          type="text"
          className="form-input w-48 lg:w-72"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <MdSearch className="absolute bottom-2.5 right-3 text-2xl" />
      </div>
      <div className="flex gap-5">
        <label>
          Fityo&apos;s foods:{' '}
          <input
            type="radio"
            name="searchType"
            checked={searchType === 'fityo'}
            onChange={() => setSearchType('fityo')}
            className="appearance-none checked:bg-green-700 dark:checked:bg-green-700"
          />
        </label>
        <label htmlFor="">
          Custom foods:{' '}
          <input
            type="radio"
            name="searchType"
            checked={searchType === 'custom'}
            onChange={() => setSearchType('custom')}
            className="appearance-none checked:bg-green-700 dark:checked:bg-green-700"
          />
        </label>
      </div>
    </div>
  );
}
