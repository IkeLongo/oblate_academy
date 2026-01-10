import Link from 'next/link';

interface SubmenuProps {
  items: { name: string; href: string }[];
  open: boolean;
}

export default function Submenu({ items, open }: SubmenuProps) {
  if (!open) return null;
  return (
    <div className="absolute left-0 mt-2 min-w-[200px] bg-white border border-gray-200 rounded shadow-lg z-50">
      {items.map((item) => {
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
  );
}
