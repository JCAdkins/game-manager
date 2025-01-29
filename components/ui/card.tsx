import * as React from "react";
import { cn } from "@/lib/utils"; // Utility function for conditional classNames (optional)
import {
  Card as RadixCard,
  CardProps as RadixCardProps,
} from "@radix-ui/themes";

// Define the props for the Card component
interface CardProps extends RadixCardProps {
  children?: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

// Create the Card component
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, header, footer, ...props }, ref) => {
    return (
      <RadixCard
        ref={ref}
        className={cn(
          "rounded-lg border bg-white shadow-md transition-shadow hover:shadow-lg text-white",
          "p-4 space-y-4",
          className
        )}
        {...props}
      >
        {header && (
          <div className="border-b pb-2 mb-4">
            <h3 className="text-lg text-center font-medium">{header}</h3>
          </div>
        )}
        <div>{children}</div>
        {footer && <div className="border-t pt-2 mt-4 text-sm">{footer}</div>}
      </RadixCard>
    );
  }
);

Card.displayName = "Card";
