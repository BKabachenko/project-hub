import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { ReadonlyURLSearchParams } from 'next/navigation';

import type { FilterKey } from '../types';

import { FILTER_KEYS } from '../constants';

export const replaceUrlFromParams = (
  router: AppRouterInstance,
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  newParams: Record<FilterKey, string[]>
) => {
  const params = new URLSearchParams(searchParams.toString());
  FILTER_KEYS.forEach((key) => params.delete(key));
  Object.entries(newParams).forEach(([key, values]) => {
    values.forEach((value) => {
      params.append(key, value);
    });
  });

  router.replace(`${pathname}?${params.toString()}`, { scroll: false });
};

export const getFiltersFromParams = (params: URLSearchParams) => {
  const entries = FILTER_KEYS.map((cat) => [cat, params.getAll(cat)]);
  return Object.fromEntries(entries) as Record<FilterKey, string[]>;
};
