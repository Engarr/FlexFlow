import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        locked:
          'bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0',
        default:
          'bg-gray-200 text-neutral-700 border-gray-400  border-b-4 active:border-b-2 hover:bg-gray-300 text-slate-500',
        primary:
          'dark:bg-lime-400 bg-lime-300 text-neutral-700 hover:bg-lime-400/80 dark:border-lime-500 border-lime-400 border-b-4 active:border-b-0 font-semibold',
        primaryOutline: 'text-lime-400 hover:text-lime-600',
        danger:
          'dark:bg-rose-500 bg-rose-400 text-neutral-700 hover:bg-rose-500/90 dark:border-rose-600 border-rose-500 border-b-4 active:border-b-0',

        sidebarActive:
          'dark:bg-zinc-800 bg-zinc-400 !text-white dark:border-zinc-700 border-zinc-300 border-2  border-b-4 active:border-b-2 dark:hover:bg-zinc-700 hover:bg-zinc-500 text-slate-500',

        ghost:
          'bg-transparent text-slate-50 border-transparent border-0 hover:text-slate-400',
      },

      size: {
        default: 'h-11 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-12',
        icon: 'h-10 w-10',
        rounded: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
