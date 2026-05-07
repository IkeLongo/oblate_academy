import { HubGradeSwitcher } from "@/app/ui/components/input/HubGradeSwitcher";
import type { GradeKey } from "@/app/types";

type HubHeaderProps = {
  grade: GradeKey;
  eyebrow: string;
  title: string;
  eyebrowColor?: string;
  titleColor?: string;
};

export function HubHeader({
  grade,
  eyebrow,
  title,
  eyebrowColor = "text-blue-300",
  titleColor = "text-blue-300",
}: HubHeaderProps) {
  return (
    <div className="flex flex-col-reverse navdesk:flex-col navdesk:flex-row navdesk:items-center navdesk:justify-between gap-10 navdesk:gap-4 mb-0 navdesk:mb-10">
      <div>
        <p className={`text-xs font-poppins font-bold uppercase tracking-widest ${eyebrowColor}`}>
          {eyebrow}
        </p>
        <h1 className={`mt-1 font-fredoka font-extrabold text-4xl navdesk:text-5xl ${titleColor}`}>
          {title}
        </h1>
      </div>

      <div className="md:min-w-[280px]">
        <p className="mb-2 text-xs text-left navdesk:!text-right font-poppins font-bold uppercase tracking-widest text-blue-300">
          Switch Grade Levels
        </p>
        <HubGradeSwitcher grade={grade} />
      </div>
    </div>
  );
}
