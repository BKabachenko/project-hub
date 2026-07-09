'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import { Moon, Sun } from 'lucide-react';

import { Button } from './button';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return <button className='h-8 w-8' />;
  return (
    <Button
      type={'button'}
      variant={'outline'}
      size={'icon'}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? <Moon /> : <Sun />}
    </Button>
  );
};

export default ThemeSwitcher;
