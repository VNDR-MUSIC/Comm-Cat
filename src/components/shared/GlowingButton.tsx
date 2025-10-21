import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/components/ui/button";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

interface GlowingButtonProps extends ButtonProps {
  asChild?: boolean;
}

const GlowingButton = React.forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ children, className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "relative inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3 text-lg font-bold text-accent-foreground shadow-lg transition-transform duration-200 ease-in-out hover:scale-105",
          "focus:outline-none focus:ring-4 focus:ring-accent/50",
          "glow-effect",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
GlowingButton.displayName = "GlowingButton";


export default GlowingButton;
