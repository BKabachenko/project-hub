'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { SearchIcon } from 'lucide-react';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/components/ui/input-group';
import { debounce } from '@/lib/utils';
import { SEARCH_KEY } from '../constants';

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const defaultParam = searchParams.get(SEARCH_KEY)?.toString() || '';

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set(SEARCH_KEY, term);
    } else {
      params.delete(SEARCH_KEY);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const debouncedHandleSearch = debounce(handleSearch, 300);

  return (
    <InputGroup className={'bg-input border-border p-6 shadow-md'}>
      <InputGroupInput
        id='inline-start-input'
        placeholder='Search...'
        type={'search'}
        className={'rounded-md'}
        defaultValue={defaultParam}
        onChange={(e) => debouncedHandleSearch(e.currentTarget.value)}
      />
      <InputGroupAddon align='inline-start'>
        <SearchIcon className='text-muted-foreground' />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchBar;
