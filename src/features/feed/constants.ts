import type { FilterKey } from './types';

import { memberRoleLabels, projectStatusLabels, projectTypeLabels } from '@/lib/constants';

export const FILTER_KEYS = ['status', 'category', 'role'] as const;

export const SEARCH_KEY = 'query' as const;

export const FILTER_LABEL_MAP: Record<FilterKey, Record<string, string>> = {
  category: projectTypeLabels,
  role: memberRoleLabels,
  status: projectStatusLabels,
};
