"use client";

import React from "react";
import { cn } from "@/lib/utils"; // Assuming you're using cn for class merging

interface CardContainerProps {
  url?: string;
  children?: React.ReactNode;
  className?: string;
}
export function CardContainer({ children, className }: CardContainerProps) {
  return (
    <div
      className={cn(
        "justify-evenly mt-10 flex flex-wrap items-center gap-x-8 gap-y-10 sm:gap-x-10 lg:mx-0 lg:max-w-none",
        className
      )}
    >
      {children}
    </div>
  );
}
