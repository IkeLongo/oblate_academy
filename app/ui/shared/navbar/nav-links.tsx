'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { GraduationCap, Church, Folder, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Submenu from './submenu';
import { GradeAnchorLink } from "@/app/ui/components/nav/GradeAnchorLink";
import type { GradeKey } from "@/app/types";

const navLinks = [
  {
    name: 'Grade Levels',
    href: '/#why',
    icon: GraduationCap,
    submenu: [
      { name: 'Kinder - 2nd Grade', href: '/grade/k-5' },
      { name: '3rd - 5th Grade', href: '/grade/6-8' },
    ],
  },
  { name: 'Catholic Faith', href: '/catholic', icon: Church },
  { name: 'Resources', href: '/resources', icon: Folder },
  { name: 'Contact', href: '/contact', icon: Mail },
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
      {navLinks.map((link) => {
        const isGradeLevels = link.name === "Grade Levels";
        const hasSubmenu = !!link.submenu;
        const isOpen = openSubmenu === link.name;
        const Icon = link.icon;

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
              className={clsx(
                "flex items-center gap-2 group transition",
                isMobile
                  ? "w-full h-[40px] font-poppins justify-start px-2 py-2 border-b border-gray-200"
                  : "h-[40px] grow font-poppins justify-start md:justify-center md:flex-none md:justify-start md:p-2 md:px-3"
              )}
            >
              <Icon className="w-5 h-5 stroke-[1.5] group-hover:stroke-[2] text-neutral-700 transition" />
              <span
                className={clsx(
                  'ml-1',
                  pathname === link.href
                    ? 'font-bold text-neutral-700'
                    : 'font-medium group-hover:font-bold text-neutral-700'
                )}
              >
                {link.name}
              </span>
              {isGradeLevels && (
                <svg
                  className={`w-4 h-4 text-neutral-700 transition-transform duration-300 ${isOpen ? '-rotate-180' : 'rotate-0'}`}
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
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col w-full bg-gray-50 rounded-b-md">
                  {link.submenu.map((item) => {
                    let hoverClass = "";
                    if (item.name === "Kinder - 2nd Grade") {
                      hoverClass = "hover:bg-blue-100 hover:text-blue-700 hover:font-bold";
                    } else if (item.name === "3rd - 5th Grade") {
                      hoverClass = "hover:bg-green-100 hover:text-green-600 hover:font-bold";
                    } else {
                      hoverClass = "hover:bg-gray-100 hover:text-green-600 hover:font-bold";
                    }

                    const grade: GradeKey =
                      item.name === "Kinder - 2nd Grade" ? "gk_2" : "g3_5";

                    return (
                      <GradeAnchorLink
                        key={item.name}
                        grade={grade}
                        className={`block px-4 py-2 text-md text-black ${hoverClass}`}
                        onClick={() => {
                          onClick();
                          setOpenSubmenu(null);
                          onSubmenuState?.(false);
                        }}
                      >
                        {item.name}
                      </GradeAnchorLink>
                    );
                  })}
                </div>
              </div>
            )}
            {/* Desktop submenu */}
            {!isMobile && hasSubmenu && (
              <Submenu
                items={link.submenu}
                open={isOpen}
                onItemClick={() => setOpenSubmenu(null)}
              />
            )}
          </div>
        );
      })}
    </>
  );
}