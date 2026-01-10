'use client';

import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Submenu from './submenu';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: 'Grade Levels',
    href: '/#why',
    icon: "/book-and-pencil.svg",
    submenu: [
      { name: 'Kinder - 2nd Grade', href: '/grade/k-5' },
      { name: '3rd - 5th Grade', href: '/grade/6-8' },
    ],
  },
  { name: 'Catholic Faith', href: '/catholic', icon: "/church.svg" },
  { name: 'Resources', href: '/resources', icon: "/folder.svg" },
];

interface NavLinksProps {
  onClick: () => void;
  isMobile?: boolean;
  onSubmenuState?: (open: boolean) => void;
}

export default function NavLinks({ onClick, isMobile = false, onSubmenuState }: NavLinksProps) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <>
      {links.map((link) => {
        const isGradeLevels = link.name === "Grade Levels";
        const hasSubmenu = !!link.submenu;
        const isOpen = openSubmenu === link.name;

        // Desktop: hover, Mobile: click
        const handleMouseEnter = () => {
          if (!isMobile && hasSubmenu) setOpenSubmenu(link.name);
        };
        const handleMouseLeave = () => {
          if (!isMobile && hasSubmenu) setOpenSubmenu(null);
        };
        const handleClick = (e: React.MouseEvent) => {
          if (hasSubmenu) {
            e.preventDefault();
            const newState = isOpen ? null : link.name;
            setOpenSubmenu(newState);
            if (isMobile && onSubmenuState) {
              onSubmenuState(!!newState);
            }
          } else {
            onClick();
          }
        };

        return (
          <div
            key={link.name}
            className={isMobile ? "w-full" : "relative"}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href={link.href}
              onClick={handleClick}
              className={
                isMobile
                  ? "flex w-full h-[40px] font-poppins items-center justify-start gap-2 px-2 py-2 border-b border-gray-200"
                  : "flex h-[40px] grow font-poppins items-center justify-start md:justify-center gap-2 hover:font-bold md:flex-none md:justify-start md:p-2 md:px-3"
              }
            >
              <Image
                src={link.icon}
                alt={`${link.name} icon`}
                width={link.name === "Catholic Faith" ? 28 : 24}
                height={link.name === "Catholic Faith" ? 28 : 24}
                className={link.name === "Catholic Faith" ? "w-7 h-7 -mr-1" : "w-6 h-6"}
              />
              <p
                className={clsx(
                  pathname === link.href
                    ? 'text-green-600 font-bold'
                    : 'font-medium hover:font-bold text-black md:text-navy-500 ml-1'
                )}
              >
                {link.name}
              </p>
              {isGradeLevels && (
                <svg
                  className={`w-4 h-4 text-black transition-transform duration-300 ${isOpen ? '-rotate-180' : 'rotate-0'}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </Link>
            {/* Desktop hover bridge */}
            {!isMobile && hasSubmenu && isOpen && (
              <div
                style={{ position: 'absolute', left: 0, top: '100%', width: '100%', height: '1rem', zIndex: 40 }}
                className="pointer-events-auto"
              />
            )}
            {/* Mobile submenu: slide down inline */}
            {isMobile && hasSubmenu && (
              <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="flex flex-col w-full bg-gray-50 rounded-b-md">
                  {link.submenu.map((item) => {
                    let hoverClass = '';
                    if (item.name === 'Kinder - 2nd Grade') {
                      hoverClass = 'hover:bg-blue-100 hover:text-blue-700 hover:font-bold';
                    } else if (item.name === '3rd - 5th Grade') {
                      hoverClass = 'hover:bg-green-100 hover:text-green-600 hover:font-bold';
                    } else {
                      hoverClass = 'hover:bg-gray-100 hover:text-green-600 hover:font-bold';
                    }
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block px-4 py-2 text-md text-black ${hoverClass}`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            {/* Desktop submenu */}
            {!isMobile && hasSubmenu && (
              <Submenu items={link.submenu} open={isOpen} />
            )}
          </div>
        );
      })}
    </>
  );
}