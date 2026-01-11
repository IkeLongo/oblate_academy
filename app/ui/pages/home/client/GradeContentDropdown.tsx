// app/ui/pages/home/client/GradeContentDropdown.tsx

"use client";

import { cn } from "@/app/lib/utils";
import { Label } from "@/app/ui/components/input/Label";
import { Dropdown } from "@/app/ui/components/input/Dropdown";

import type { GradeKeyLink } from "@/app/types/types";

type GradeDropdownProps = {
  grade: GradeKeyLink;
  options: { value: GradeKeyLink; label: string }[];
  onChange: (grade: GradeKeyLink) => void;
  compact?: boolean;
};

export function GradeDropdown({ grade, options, onChange, compact }: GradeDropdownProps) {
  return (
    <div className={cn("block w-full my-6 max-w-[450px]")}> 
      <div className="flex w-full flex-col space-y-2">
        {!compact && (
          <Label className="text-gray-500 font-inria font-bold ml-2" htmlFor="tab-select">
            Select a grade level:
          </Label>
        )}

        <Dropdown
          options={options}
          placeholder={compact ? "Test" : "Select a grade level..."}
          className="bg-white max-w-[450px] rounded-2xl border border-grey-800 shadow-lg"
          value={grade}
          singleSelect
          selectedValueClassName="text-xl text-blue-200 font-bold tracking-loose"
          onChange={(val) => {
            if (typeof val === "string" && (val === "k-2" || val === "3-5")) {
              onChange(val);
            }
          }}
        />
      </div>
    </div>
  );
}
