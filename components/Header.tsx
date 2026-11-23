"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <nav className="container-page flex items-center justify-between h-16">
        <Link href="/" className="text-2xl font-heading text-brand-700">
          StayView
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/rooms" className="text-neutral-600 hover:text-brand-600 transition-colors">
            Rooms
          </Link>
          <Link href="/booking" className="text-neutral-600 hover:text-brand-600 transition-colors">
            Book
          </Link>
          <Link href="/rooms" className="btn-primary text-sm px-4 py-2">
            Reserve Now
          </Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <div className="container-page py-4 flex flex-col gap-3">
            <Link href="/rooms" className="text-neutral-600 py-2" onClick={() => setMobileMenuOpen(false)}>
              Rooms
            </Link>
            <Link href="/booking" className="text-neutral-600 py-2" onClick={() => setMobileMenuOpen(false)}>
              Book
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
