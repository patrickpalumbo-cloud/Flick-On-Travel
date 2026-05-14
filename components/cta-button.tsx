import Link from "next/link";
import type { ReactNode } from "react";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "light" | "dark" | "ghost";
};

export function CtaButton({ href, children, variant = "light" }: CtaButtonProps) {
  const styles = {
    light: "bg-ink text-ivory hover:bg-graphite shadow-[0_18px_45px_rgba(23,19,15,0.16)]",
    dark: "bg-white text-ink hover:bg-ivory border border-black/10 shadow-[0_18px_45px_rgba(93,72,48,0.12)]",
    ghost: "border border-black/12 bg-white/62 text-ink shadow-[0_18px_45px_rgba(93,72,48,0.08)] backdrop-blur hover:border-brass/70 hover:bg-white"
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
