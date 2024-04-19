import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const boxVariants = cva("", {
  variants: {},
  defaultVariants: {},
});

export interface DivProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  asChild?: boolean;
}

const Box = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp className={cn(boxVariants({ className }))} ref={ref} {...props} />
    );
  }
);

Box.displayName = "Box";

export { Box, boxVariants };
