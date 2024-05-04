import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import { Switch } from './ui/switch';
import { Label } from './ui/label';

export default function ThemeSwitch() {
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
    <div className='flex items-center space-x-2'>
      <Switch id='theme-mode' onCheckedChange={switchTheme} />
      <Label htmlFor='theme-mode'>{resolvedTheme} mode</Label>
    </div>
  );
}
