import type { FILTER_KEYS } from '../constants';


export type FilterKey = (typeof FILTER_KEYS)[number];

export type FilterOption = { id: string; value: string; };
