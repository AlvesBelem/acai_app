"use client";

import { cn } from "@/lib/utils";
import React from "react";

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("w-full max-w-6xl mx-auto px-4", className)}>
      {children}
    </div>
  );
}
