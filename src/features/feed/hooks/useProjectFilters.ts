import { useEffect, useRef, useState } from 'react';

import type { ReadonlyURLSearchParams } from 'next/navigation';
import { usePathname, useRouter } from 'next/navigation';

import type { FilterKey } from '../types';

import { FILTER_KEYS } from '@/features/feed/constants';

type useProjectFilters = (searchParams: ReadonlyURLSearchParams) => {
  activeFilters: Record<FilterKey, string[]>;
  handleToggleChange: (type: FilterKey, id: string, isChecked: boolean) => void;
  handleClearAll: () => void;
};

const getFiltersFromParams = (params: URLSearchParams) => {
  const entries = FILTER_KEYS.map((cat) => [cat, params.getAll(cat)]);
  return Object.fromEntries(entries) as Record<FilterKey, string[]>;
};

export const useProjectFilters: useProjectFilters = (searchParams) => {
  const router = useRouter();
  const pathname = usePathname();

  const [activeFilters, setActiveFilters] = useState<Record<FilterKey, string[]>>(() =>
    getFiltersFromParams(searchParams)
  );

  const localParams = useRef({ ...activeFilters });

  const [prevUrlParams, setPrevUrlParams] = useState(() => searchParams.toString());
  const currentUrlParams = searchParams.toString();

  if (currentUrlParams !== prevUrlParams) {
    setPrevUrlParams(currentUrlParams);
    setActiveFilters(getFiltersFromParams(searchParams));
  }

  useEffect(() => {
    localParams.current = activeFilters;
  }, [activeFilters]);

  const handleToggleChange = (type: FilterKey, id: string, isChecked: boolean) => {
    const oldParams = localParams.current;

    const changedParam = isChecked
      ? [...localParams.current[type], id]
      : localParams.current[type].filter((item) => item !== id);

    localParams.current = { ...oldParams, [type]: changedParam };

    setActiveFilters(localParams.current);

    const params = new URLSearchParams(searchParams.toString());
    FILTER_KEYS.forEach((key) => params.delete(key));
    Object.entries(localParams.current).forEach(([key, values]) => {
      values.forEach((value) => {
        params.append(key, value);
      });
    });

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams.toString());

    const clearedFilters = FILTER_KEYS.reduce(
      (acc, key) => {
        params.delete(key);
        acc[key] = [];
        return acc;
      },
      {} as Record<FilterKey, string[]>
    );

    localParams.current = clearedFilters;
    setActiveFilters(localParams.current);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { activeFilters, handleToggleChange, handleClearAll };
};
