import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const boxVariants = cva("", {
  variants: {
    variant: {
      default: "",
      navy: "bg-[#141451]",
      pinkPurple: "bg-gradient-to-b from-[#F76CE0] to-[#736CF7]",
      orange: "bg-gradient-to-b from-[#FC8E51] to-[#F05C58]",
      green: "bg-gradient-to-b from-[#35AC65] to-[#41898E]",
      red: "bg-gradient-to-b from-[#DD2476] to-[#FF512F]",
      grey: "bg-[#FFFFFF33]",
      shadow:
        "backdrop-blur-[76.98px] shadow-[inset_0px_0px_22px_0px_rgba(255,255,255,0.6)]",

      //   outline: `border-2 border-white bg-[rgba(196,196,196,0.01)] `,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface DivProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  asChild?: boolean;
}

const Box = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(boxVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Box.displayName = "Box";

export { Box, boxVariants };
