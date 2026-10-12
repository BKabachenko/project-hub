'use client';

import { type ChangeEvent, type KeyboardEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Search } from 'lucide-react';

import { SEARCH_KEY } from '@/lib/constants';
import { Button } from '@/shared/components/ui/button';
import { Field } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';

const SearchBlock = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim().length > 0) {
      const trimmed = query.trim();
      if (trimmed.length > 0) {
        router.push(`/feed?${SEARCH_KEY}=${encodeURIComponent(trimmed)}`);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  return (
    <Field orientation={'horizontal'}>
      <div
        className={
          'bg-card has-focus-visible:ring-ring flex w-full flex-row items-center justify-center rounded-xl border px-2 py-1 shadow-sm transition-all has-focus-visible:ring-2'
        }
      >
        <Search aria-hidden='true' />
        <Input
          name={'search'}
          className={
            'text-md border-none py-0 placeholder:text-sm focus-visible:border-none focus-visible:ring-0 md:text-lg dark:bg-transparent'
          }
          placeholder='Search by discipline (Design, Code, Product, Community) or goal...'
          aria-label='Search projects'
          type='search'
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={() => handleSearch()}>Find Projects</Button>
      </div>
    </Field>
  );
};

export default SearchBlock;
