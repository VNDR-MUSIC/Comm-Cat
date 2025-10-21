import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/components/ui/button";

interface GlowingButtonProps extends ButtonProps {
  asChild?: boolean;
}

const GlowingButton = ({ children, className, ...props }: GlowingButtonProps) => {
  return (
    <button
      className={cn(
        "relative rounded-lg p-[3px] shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-500/50",
        "bg-gradient-to-r from-yellow-400 via-amber-500 via-blue-500 to-cyan-400",
        "bg-400% animate-gradient-flow",
        className
      )}
      style={{ backgroundSize: '400%' }}
      {...props}
    >
      <div className="bg-primary text-primary-foreground px-8 py-3 rounded-md w-full h-full transition-colors hover:bg-primary/90">
        <span className="font-bold">{children}</span>
      </div>
    </button>
  );
};

export default GlowingButton;
