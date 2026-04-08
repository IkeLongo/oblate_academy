import Link from "next/link";

type CardColor = {
  text: string;
  border: string;
  bg: string;
};

export type HubCardProps = {
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  color: CardColor;
  subtitle?: string;
};

export function HubCard({ title, href, imageSrc, imageAlt, color, subtitle }: HubCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
    >
      <div
        className={`overflow-hidden rounded-2xl border-2 ${color.border} ${color.bg} shadow-sm transition group-hover:shadow-md flex flex-col`}
      >
        {/* Image */}
        <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover transition group-hover:scale-105 duration-300"
            loading="lazy"
          />
        </div>

        {/* Name — fixed 2-line height keeps all cards in a row the same height */}
        <div className={`border-t-2 ${color.border} ${color.bg} px-3 h-[4rem] flex items-center justify-center`}>
          <h4 className={`text-center font-extrabold text-sm leading-snug line-clamp-2 ${color.text}`}>
            {title}
          </h4>
        </div>
        {subtitle && (
          <div className={`${color.bg} px-3 pb-2`}>
            <p className={`text-center text-xs font-poppins opacity-70 ${color.text}`}>
              {subtitle}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
