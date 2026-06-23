'use client';

import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { FieldGroup, FieldSeparator, FieldSet } from '@/components/ui/field';
import { useProjectFilters } from '@/features/feed/hooks/useProjectFilters';
import type { FilterOption } from '@/features/feed/types';
import { memberRoleLabels, projectStatusLabels, projectTypeLabels } from '@/lib/constants';

import FilterCheckboxGroup from './FilterCheckboxGroup';

const projectTypes: FilterOption[] = Object.entries(projectTypeLabels).map(([key, value]) => ({
  id: key,
  value: value,
}));

const projectStatuses: FilterOption[] = Object.entries(projectStatusLabels).map(([key, value]) => ({
  id: key,
  value: value,
}));

const projectRoles: FilterOption[] = Object.entries(memberRoleLabels)
  .map(([key, value]) => ({
    id: key,
    value: value,
  }))
  .filter((i) => i.id !== 'OWNER');

const FilterBlock = () => {
  const searchParams = useSearchParams();

  const { activeFilters, handleToggleChange, handleClearAll } = useProjectFilters(searchParams);

  return (
    <div className='border-border min-w-66 rounded-md border bg-transparent p-4'>
      <FieldGroup>
        <div className='flex flex-row items-baseline justify-between'>
          <h3 className={'font-semibold'}>FILTERS</h3>
          <Button
            type={'button'}
            variant={'ghost'}
            className={'text-muted-foreground text-xs underline'}
            onClick={handleClearAll}
          >
            Clear all
          </Button>
        </div>
        <FieldSet>
          <FilterCheckboxGroup
            title={'Project Type'}
            filterKey={'category'}
            options={projectTypes}
            checkedState={activeFilters['category']}
            onChange={handleToggleChange}
          />

          <FieldSeparator />
          <FilterCheckboxGroup
            title={'Project status'}
            filterKey={'status'}
            options={projectStatuses}
            checkedState={activeFilters['status']}
            onChange={handleToggleChange}
          />

          <FieldSeparator />
          <FilterCheckboxGroup
            title={'Roles Needed'}
            filterKey={'role'}
            options={projectRoles}
            checkedState={activeFilters['role']}
            onChange={handleToggleChange}
          />
        </FieldSet>
      </FieldGroup>
    </div>
  );
};

export default FilterBlock;
