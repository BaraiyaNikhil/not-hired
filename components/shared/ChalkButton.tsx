import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

export interface ChalkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const ChalkButton = React.forwardRef<HTMLButtonElement, ChalkButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button";
    return (
      <Comp
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(
          "chalk-button chalk-text inline-flex items-center justify-center transition-all disabled:opacity-50",
          className
        )}
        style={{ borderWidth: "2px", ...props.style }}
        {...props}
      />
    );
  }
);
ChalkButton.displayName = "ChalkButton";
