"use client";

import { useState } from "react";
import Link from "next/link";
import { CTAButton } from "./cta-button";

const navItems = [
  { label: "Journey", href: "#journey" },
  { label: "Stories", href: "#stories" },
  { label: "Evidence", href: "#evidence" },
  { label: "About", href: "/about" },
  { label: "Nominate", href: "#nominate" },
  { label: "Book", href: "#book" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-color-container-black/90 px-6 py-4 backdrop-blur sm:px-12">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-2xl uppercase tracking-[0.35em] text-white"
          onClick={() => setOpen(false)}
        >
          CONTAINED
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 text-sm uppercase tracking-[0.25em] text-white/70 md:flex"
        >
          {navItems.map((item) => (
            <Link key={item.href} className="hover:text-white" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:inline-flex">
          <CTAButton href="#book" className="uppercase tracking-[0.3em]">
            Book Experience
          </CTAButton>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5"
          >
            <path d="M4 7h16" strokeLinecap="round" />
            <path d="M4 12h16" strokeLinecap="round" />
            <path d="M4 17h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="md:hidden"
      >
        <div className="mt-4 space-y-4 rounded-2xl border border-white/10 bg-white/10 p-6 text-sm uppercase tracking-[0.25em] text-white/80">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <CTAButton
            href="#book"
            fullWidth
            className="uppercase tracking-[0.3em]"
            onClick={() => setOpen(false)}
          >
            Book Experience
          </CTAButton>
        </div>
      </div>
    </header>
  );
}
