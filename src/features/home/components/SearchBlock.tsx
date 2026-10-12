import Form from 'next/form';

import { Search } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

const SearchBlock = () => {
  return (
    <Form
      action={'/feed'}
      className='bg-card has-focus-visible:ring-ring flex w-full flex-row items-center justify-between rounded-xl border px-2 py-1 shadow-sm transition-all has-focus-visible:ring-2'
    >
      <div className='flex flex-1 items-center gap-2 px-1'>
        <Search aria-hidden='true' />
        <Input
          name={'query'}
          type='search'
          placeholder='Search by discipline (Design, Code, Product, Community) or goal...'
          aria-label='Search projects'
          required
          className={
            'text-md border-none py-0 placeholder:text-sm focus-visible:border-none focus-visible:ring-0 md:text-lg dark:bg-transparent'
          }
        />
        <Button type={'submit'}>Find Projects</Button>
      </div>
    </Form>
  );
};

export default SearchBlock;
