// app/ui/layout/footer.tsx
"use client";

import Link from 'next/link';
import Image from "next/image";
import { Mail, Phone, Facebook, Instagram } from "lucide-react";
// Official X (Twitter) SVG icon
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={props.width || 20} height={props.height || 20} {...props}>
    <path d="M17.53 3H21.5L14.5 10.71L22.75 21H16.19L11.13 14.62L5.5 21H1.5L8.84 12.82L1 3H7.69L12.29 9.73L17.53 3ZM16.37 19H18.23L7.7 5H5.73L16.37 19Z" fill="currentColor"/>
  </svg>
);
import ScrollToTopButton from './scroll-to-top';

const BUSINESS_EMAIL = process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "contact@oblateacademy.com";

function getCurrentYear() {
  return new Date().getFullYear();
}

export default function Footer() {
  const columns = [
    {
      title: 'About Oblate Academy',
      links: [
        { 
          name: 'Helping children grow in their catholic faith through saints, virtues, ' +
                'and engaging activities. Learn more about our mission and values.',
          href: '/about' 
        },
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { name: 'HOME', href: '/' },
        { name: 'K - 2nd GRADE', href: '/k-2nd-grade' },
        { name: '3 - 5th GRADE', href: '/3-5th-grade' },
      ],
    },
    {
      title: 'Learning',
      links: [
        { name: 'CATHOLIC FAITH', href: '/privacy' },
        { name: 'RESOURCES', href: '/terms' },
        { name: 'SUPPORT', href: '/cookies' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { name: 'Email', href: `mailto:${BUSINESS_EMAIL}` },
        { name: 'Phone', href: 'tel:2107306232' },
        { name: 'Social', href: '#' },
      ],
    },
  ];

  return (
    <footer className="base w-full px-10 py-20 bg-blue-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {columns.map((col) => (
          <div key={col.title} className="flex flex-col max-w-[350px]">
            <h3 className="mb-6 text-white">{col.title}</h3>
            <div className="flex flex-col gap-2">
              {col.title === 'Contact'
                ? col.links.map((link) => {
                    if (link.name === 'Email') {
                      return (
                        <Link key={link.name} href={link.href} className="flex items-center gap-2 font-inria text-md text-gray-100">
                          <Mail size={18} />
                          {BUSINESS_EMAIL}
                        </Link>
                      );
                    }
                    if (link.name === 'Phone') {
                      return (
                        <Link key={link.name} href={link.href} className="flex items-center gap-2 font-inria text-md text-gray-100">
                          <Phone size={18} />
                          210-730-6232
                        </Link>
                      );
                    }
                    if (link.name === 'Social') {
                      return (
                        <div key={link.name} className="flex gap-4 mt-2">
                          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <Facebook size={20} className="text-gray-100 hover:text-blue-300 transition-colors" />
                          </a>
                          <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
                            <XIcon className="text-gray-100 hover:text-blue-300 transition-colors" />
                          </a>
                          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Instagram size={20} className="text-gray-100 hover:text-blue-300 transition-colors" />
                          </a>
                        </div>
                      );
                    }
                    return (
                      <Link key={link.name} href={link.href} className="font-inria text-md text-gray-100">
                        {link.name}
                      </Link>
                    );
                  })
                : col.links.map((link) => (
                    <Link key={link.name} href={link.href} className="font-inria text-md text-gray-100">
                      {link.name}
                    </Link>
                  ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center max-w-7xl mx-auto mt-10">
        <Image src="/bible.svg" alt="Bible Icon" width={120} height={120} />
        <div className="flex-1 -ml-4 h-0.5 bg-gray-200 mb-6" />
      </div>
      <div className="font-inria mt-10 md:-mt-10 text-center text-sm text-gray-400">
        &copy; {getCurrentYear()}  Oblate Academy. All Rights Reserved. Built with love for Catholic education.
      </div>
      <div className="flex justify-center mt-4">
        <ScrollToTopButton />
      </div>
    </footer>
  );
}