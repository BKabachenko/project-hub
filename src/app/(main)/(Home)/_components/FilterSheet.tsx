import { SlidersHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import FilterBlock from './FilterBlock';

const FilterSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'ghost'} className={'h-full w-full [&_svg]:size-6'}>
          <SlidersHorizontal className={'size-7'} />
        </Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>List of filters.</SheetTitle>
          <SheetDescription>Chose one or many to filter list of projects.</SheetDescription>
        </SheetHeader>
        <FilterBlock />
        <SheetFooter>
          <Button type='submit'>Save changes</Button>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
