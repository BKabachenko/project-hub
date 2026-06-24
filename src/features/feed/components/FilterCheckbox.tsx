'use client';

import { Checkbox } from '@/shared/components/ui/checkbox';
import { FieldLabel } from '@/shared/components/ui/field';

interface FilterCheckboxProps {
  id: string;
  checked: boolean;
  text: string;
  onCheckedChange: (isChecked: boolean) => void
}

const FilterCheckbox = ({ id, checked, text, onCheckedChange}: FilterCheckboxProps) => {
  const labelStyles = 'font-regular text-muted-foreground cursor-pointer';

  return (
    <>
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange}/>
      <FieldLabel className={labelStyles} htmlFor={id}>
        {text}
      </FieldLabel>
    </>
  );
};

export default FilterCheckbox;
