'use client';

import { Field, FieldGroup, FieldLegend } from '@/shared/components/ui/field';

import type { FilterKey, FilterOption } from '@/features/feed/types';
import FilterCheckbox from './FilterCheckbox';

interface FilterCheckboxGroupProps {
  title: string;
  filterKey: FilterKey;
  options: FilterOption[];
  checkedState: string[] ;
  onChange: (filterKey: FilterKey, id:string, isChecked: boolean) => void;
}

const labelStyles = 'font-regular text-muted-foreground';

const FilterCheckboxGroup = ({
  title,
  filterKey,
  options,
  checkedState,
  onChange,
}: FilterCheckboxGroupProps) => {
  return (
    <FieldGroup className={'gap-3'}>
      <FieldLegend variant={'label'} className={labelStyles}>
        {title}
      </FieldLegend>
      {options.map((option) => (
        <Field orientation={'horizontal'} key={option.id}>
          <FilterCheckbox
            id={option.id}
            checked={checkedState.includes(option.id)}
            text={option.value}
            onCheckedChange={(isChecked) => onChange(filterKey, option.id, isChecked)}
          />
        </Field>
      ))}
    </FieldGroup>
  );
};

export default FilterCheckboxGroup;
