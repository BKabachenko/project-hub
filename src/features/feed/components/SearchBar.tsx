'use client';

import { useCallback, useEffect, useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { SearchIcon } from 'lucide-react';

import { SEARCH_KEY } from '@/lib/constants';
import { debounce } from '@/lib/utils';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/components/ui/input-group';

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultParam = searchParams.get(SEARCH_KEY)?.toString() || '';

  const handleSearch = useCallback(
    (raw: string) => {
      const term = raw.trim();
      const params = new URLSearchParams(window.location.search);

      if (term) {
        params.set(SEARCH_KEY, term);
      } else {
        params.delete(SEARCH_KEY);
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router]
  );

  const debouncedHandleSearch = useMemo(() => debounce(handleSearch, 300), [handleSearch]);
  useEffect(() => {
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [debouncedHandleSearch]);

  return (
    <InputGroup className={'bg-card border-border p-6 shadow-md'}>
      <InputGroupInput
        id='inline-start-input'
        placeholder='Search...'
        type={'search'}
        className={'rounded-md'}
        defaultValue={defaultParam}
        onChange={(e) => debouncedHandleSearch(e.currentTarget.value)}
      />
      <InputGroupAddon align='inline-start'>
        <SearchIcon aria-hidden={true} className='text-muted-foreground' />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchBar;
