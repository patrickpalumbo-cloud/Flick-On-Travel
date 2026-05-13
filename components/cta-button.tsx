import Link from "next/link";
import type { ReactNode } from "react";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "light" | "dark" | "ghost";
};

export function CtaButton({ href, children, variant = "light" }: CtaButtonProps) {
  const styles = {
    light: "bg-ivory text-ink hover:bg-white shadow-[0_18px_45px_rgba(255,255,255,0.12)]",
    dark: "bg-ink text-ivory hover:bg-graphite border border-white/15",
    ghost: "border border-white/20 bg-white/[0.06] text-ivory backdrop-blur hover:border-brass/70 hover:bg-white/10"
  };

  return (
    <Link
      href={href}
      className={`focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}
