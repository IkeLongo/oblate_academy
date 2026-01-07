"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, SetStateAction } from 'react';
import NavLinks from "./nav-links";
import Hamburger from "hamburger-react";


export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  // Callback to receive submenu state from NavLinks
  const handleSubmenuState = (open: boolean) => {
    setSubmenuOpen(open);
  };

  // Custom toggle handler to close submenu when menu closes
  const handleMenuToggle = (value: SetStateAction<boolean>) => {
    // Resolve the value if it's a function
    const newValue = typeof value === 'function' ? value(menuOpen) : value;
    
    setMenuOpen(newValue);
    if (!newValue) {
      setSubmenuOpen(false);
      setResetKey(prev => prev + 1); // Force NavLinks to reset
    }
  };

  // Calculate menu height based on submenu state
  const baseHeight = 200;
  const submenuHeight = submenuOpen ? 80 : 0; // Adjust as needed for submenu content
  const menuHeight = baseHeight + submenuHeight;

  return (
    <div className="w-full align-center md:hidden">
      <div className="absolute z-20 w-full bg-white border-x-[1px] border-blue-800">
        <div className="flex flex-row justify-between h-[65px] pl-0 px-6 pt-[10px] items-center">
          <Link href="/">
            <Image
              src="/oblate-logo-black.png"
              alt="Logo"
              width={200}
              height={100}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Link>

          <Hamburger
            toggled={menuOpen}
            toggle={handleMenuToggle}
            size={30}
            direction="left"
            duration={0.3}
            distance="sm"
            rounded
            label="Show menu"
            color="#000000"
            easing="ease-in"
          />
        </div>
      </div>

      <div
        style={{ height: menuOpen ? menuHeight : 200, transition: 'height 0.3s' }}
        className={`absolute top-[20px] w-full flex flex-col justify-between px-6 py-6 bg-white border-[1px] border-t-0 border-blue-800 rounded-b-[13px] drop-shadow-[0_14px_16.2px_rgba(0,0,0,0.25)] backdrop-blur-[7px] transition-transform duration-500 ease-in-out z-10 ${
          menuOpen ? "translate-y-8" : "-translate-y-[140px]"
        }`}
      >
        <NavLinks key={resetKey} onClick={() => setMenuOpen(false)} isMobile={true} onSubmenuState={handleSubmenuState} />
      </div>
    </div>
  );
}
