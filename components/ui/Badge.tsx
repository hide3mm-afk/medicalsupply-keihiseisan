import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export default function Badge({ children, variant = "primary" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
      variant === "primary" ? "bg-primary text-white" : "border border-primary/20 bg-pale text-primary"
    }`}>
      {children}
    </span>
  );
}
