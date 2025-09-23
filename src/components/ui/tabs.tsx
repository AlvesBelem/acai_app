"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TabsContextValue = {
  value: string;
  setValue: (v: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

type TabsProps = {
  defaultValue?: string;
  value?: string;
  onValueChange?: (v: string) => void;
  className?: string;
  children: React.ReactNode;
};

export function Tabs({ defaultValue, value, onValueChange, className, children }: TabsProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const current = value ?? internal;
  const setValue = React.useCallback(
    (v: string) => {
      if (onValueChange) onValueChange(v);
      else setInternal(v);
    },
    [onValueChange]
  );

  React.useEffect(() => {
    if (!defaultValue && React.Children.count(children) > 0 && !current) {
      const first = React.Children.toArray(children).find((child: any) => child?.type?.displayName === "TabsContent");
      if (first && (first as any).props?.value) setInternal((first as any).props.value);
    }
  }, [children, current, defaultValue]);

  return (
    <TabsContext.Provider value={{ value: current, setValue }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("inline-flex items-center rounded-md bg-gray-100 p-1", className)}>{children}</div>
  );
}

export function TabsTrigger({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(TabsContext)!;
  const active = ctx.value === value;
  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-md transition-colors",
        active ? "bg-white shadow-sm" : "text-gray-600 hover:text-gray-900",
        className
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

TabsTrigger.displayName = "TabsTrigger";

export function TabsContent({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(TabsContext)!;
  if (ctx.value !== value) return null;
  return <div className={cn("mt-4", className)}>{children}</div>;
}

TabsContent.displayName = "TabsContent";

