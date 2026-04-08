"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionClientProps = {
  items: FAQItem[];
};

export function FAQSectionClient({ items }: FAQSectionClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-2xl bg-white border border-gray-200 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-poppins font-semibold text-base text-blue-400">
                {item.question}
              </span>
              <ChevronDown
                size={20}
                strokeWidth={2}
                className={`flex-shrink-0 text-blue-300 transition-transform duration-200 ${
                  isOpen ? "-rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-6 pb-5">
                <p className="font-inria text-base leading-relaxed text-black/70">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
