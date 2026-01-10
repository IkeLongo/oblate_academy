"use client";

import { useState } from 'react';
import Image from "next/image";
import { Button } from "@heroui/button";
import Link from 'next/link';
import NavLinks from './nav-links';
import MobileMenu from './mobile-menu';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentHref, setCurrentHref] = useState('/');

  const handleLogoClick = () => {
    setCurrentHref('/');
  };

  return (
    <div className="sticky top-0 left-0 w-full z-50 bg-white shadow-sm">
      <div className="z-60">
        <MobileMenu />
        <div className="flex items-center justify-center">
          <div className='hidden md:w-full md:flex md:flex-col md:justify-center md:gap-[10px]'>
            <div className='flex py-[13px] px-[20px] justify-between items-center self-stretch'>
              <div>
                <Link href="/" onClick={handleLogoClick}>
                  <Image
                    src="/oblate-logo-black.png"
                    alt="Logo"
                    width={225}
                    height={100}/>
                </Link>
              </div>
              <div className='flex gap-6 items-center'>
                <NavLinks 
                  onClick={() => setMenuOpen(false)} // Close the menu when a link is clicked
                />
                <Button
                  onPress={() => setMenuOpen(false)} // Close the menu when the button is clicked
                  className="hidden font-maven-pro text-white text-[14px] font-bold lg:font-normal rounded-[13px] bg-gray-500 py-2 lg:text-[16px]">
                  <Link href="/login" className="h-full flex items-center justify-center">
                    Login
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}