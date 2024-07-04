'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

import { Switch } from './ui/switch';
import { Label } from './ui/label';

type PropsType = {
  style?: string;
};

export default function ThemeSwitch({ style }: PropsType) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  const switchTheme = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };
  return (
    <div className={cn('flex items-center space-x-2', style)}>
      <Switch id='theme-mode' onCheckedChange={switchTheme} />
      <Label htmlFor='theme-mode'>{resolvedTheme} mode</Label>
    </div>
  );
}
