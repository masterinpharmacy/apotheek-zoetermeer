"use client";

import { useState } from "react";

const links = [
  { href: "#hoe-het-werkt", label: "Hoe het werkt" },
  { href: "#recept-uploaden", label: "Recept insturen" },
  { href: "#diensten", label: "Diensten" },
  { href: "/inschrijven", label: "Inschrijven" },
  { href: "#over-ons", label: "Over ons" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-pine/10">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
        <a href="#" className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full border-2 border-pine flex items-center justify-center text-pine font-display font-semibold text-sm">
            AZ
          </span>
          <span className="font-display text-xl text-pine tracking-tight">
            Apotheek Zoetermeer
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink/80 hover:text-clay transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#recept-uploaden"
          className="hidden md:inline-flex items-center bg-clay text-paper px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-clay-dark transition-colors"
        >
          Recept insturen
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-pine"
          aria-label="Menu openen"
          aria-expanded={open}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden px-6 pb-6 flex flex-col gap-4 border-t border-pine/10 pt-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-ink/80 text-sm"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#recept-uploaden"
            onClick={() => setOpen(false)}
            className="inline-flex justify-center bg-clay text-paper px-5 py-3 rounded-full text-sm font-semibold"
          >
            Recept insturen
          </a>
        </nav>
      )}
    </header>
  );
}
