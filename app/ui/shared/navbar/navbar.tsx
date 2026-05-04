// app/ui/shared/navbar/navbar.tsx

"use client";

import Image from "next/image";
import Link from 'next/link';
import NavLinks from './nav-links';
import MobileMenu from './mobile-menu';

export default function Navbar() {
  return (
    <div className="sticky top-0 left-0 w-full z-50 bg-white shadow-sm">
      {/* Mobile */}
      <MobileMenu />

      {/* Desktop */}
      <div className="hidden navdesk:flex items-center px-6 py-3">
        {/* Left: Logo */}
        <div className="flex-1">
          <Link href="/">
            <Image
              src="/oblate-logo-black.png"
              alt="Oblate Academy"
              width={200}
              height={88}
            />
          </Link>
        </div>

        {/* Center: Nav links */}
        <nav aria-label="Main navigation" className="flex items-center gap-3">
          <NavLinks onClick={() => {}} />
        </nav>

        {/* Right: Donate CTA */}
        <div className="flex-1 flex justify-end">
          <Link
            href="/donate"
            className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-5 py-2 font-poppins font-semibold text-sm text-yellow-900 shadow hover:bg-yellow-300 transition-colors"
          >
            Donate
          </Link>
        </div>
      </div>
    </div>
  );
}