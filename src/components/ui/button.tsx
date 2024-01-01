import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-text bg-gradient-to-r from-blueSky to-pink hover:to-blueSky hover:from-pink",
        // destructive:
        // "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input text-text hover:text-text/80",
        secondary: "bg-slate-900/40 text-text hover:bg-slate-900/50",
        tertiary: "bg-slate-100/10 text-text hover:bg-slate-100/20",
        ghost: "text-text hover:text-text/80",
        link: "text-cyan-400 text-xs font-semibold",
      },
      size: {
        default: "h-10 font-semibold px-4 py-2",
        sm: "h-9 rounded-md px-3",
        md: "h-12 text-[16px] font-semibold px-4 py-2",
        lg: "h-11 rounded-md px-8 font-bold text-lg",
        xl: "h-16 rounded-md px-8 font-extrabold text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
