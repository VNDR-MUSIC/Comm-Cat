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
          "relative inline-flex items-center justify-center rounded-lg p-[3px] shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-500/50",
          "bg-gradient-to-r from-yellow-400 via-amber-500 via-blue-500 to-cyan-400",
          "bg-400% animate-gradient-flow",
          className
        )}
        style={{ backgroundSize: '400%' }}
        ref={ref}
        {...props}
      >
        <div className={cn("bg-primary text-primary-foreground px-8 py-3 rounded-md w-full h-full transition-colors hover:bg-primary/90 flex items-center justify-center", asChild && "bg-transparent")}>
          <span className="font-bold">{children}</span>
        </div>
      </Comp>
    );
  }
);
GlowingButton.displayName = "GlowingButton";


export default GlowingButton;
