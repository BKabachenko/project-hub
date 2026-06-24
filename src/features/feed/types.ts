import type z from 'zod';

import type { FILTER_KEYS, SEARCH_KEY } from './constants';
import type { filterParamsSchema } from './schema';

export type SearchKey = typeof SEARCH_KEY;

export type FilterKey = (typeof FILTER_KEYS)[number];
export type FilterOption = { id: string; value: string };

export type AllFilterKeys = SearchKey | FilterKey;

export type resolvedParamsType = { [key: string]: string | string[] | undefined };

export type FilterParams = z.infer<typeof filterParamsSchema>;
