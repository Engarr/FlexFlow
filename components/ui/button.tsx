import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide ',
  {
    variants: {
      variant: {
        locked:
          'bg-neutral-200  hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-2 ',
        default:
          'bg-gray-50 border-gray-300  dark:border-gray-400  hover:bg-gray-100 text-slate-500 border-b-4 active:border-b-2 border-t border-x ',
        primary:
          'bg-lime-400 border-lime-600 text-neutral-700 hover:bg-lime-400/80  font-semibold border-b-4 border-b-4 active:border-b-2',
        primaryOutline:
          'text-text-secondary hover:text-lime-700 border-transparent font-semibold border-b-4 active:border-b-2',
        danger:
          'bg-rose-500 text-neutral-700 hover:bg-rose-400/90  border-rose-700 border-b-4 active:border-b-2',
        sidebarActive:
          'dark:bg-gray-50/80 bg-gray-100 dark:border-gray-300 border-gray-300 dark:border-gray-400  hover:bg-gray-100 text-slate-500 border-b-2 active:border-b-0 border-t-2 border-x ',
        ghost:
          'bg-transparent text-text border-transparent border-0 hover:text-slate-400',
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
