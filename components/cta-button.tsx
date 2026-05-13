import Link from "next/link";
import type { ReactNode } from "react";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "light" | "dark" | "ghost";
};

export function CtaButton({ href, children, variant = "light" }: CtaButtonProps) {
  const styles = {
    light: "bg-ivory text-ink hover:bg-white",
    dark: "bg-ink text-ivory hover:bg-graphite border border-white/15",
    ghost: "border border-white/20 bg-white/5 text-ivory hover:border-brass/70 hover:bg-white/10"
  };

  return (
    <Link
      href={href}
      className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold transition ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}
