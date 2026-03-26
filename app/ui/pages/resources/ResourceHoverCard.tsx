"use client";

import { useState } from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { FileText, BookOpen } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import type { ModalResource } from "./ResourceModal";

type Props = {
  resource: ModalResource;
  children: React.ReactNode;
};

export function ResourceHoverCard({ resource, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const x = useMotionValue(0);
  const translateX = useSpring(x, { stiffness: 150, damping: 15 });

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetFromCenter = (event.clientX - rect.left - rect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  return (
    <HoverCardPrimitive.Root openDelay={300} closeDelay={100} onOpenChange={setIsOpen}>
      <HoverCardPrimitive.Trigger asChild onMouseMove={handleMouseMove}>
        {children}
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          className="[transform-origin:var(--radix-hover-card-content-transform-origin)] z-50"
          side="top"
          align="center"
          sideOffset={10}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.92 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 20 },
                }}
                exit={{ opacity: 0, y: 12, scale: 0.92 }}
                className="rounded-xl shadow-xl overflow-hidden bg-white border border-neutral-200"
                style={{ x: translateX }}
              >
                {resource.kind === "image" && resource.image ? (
                  <img
                    src={urlFor(resource.image).width(260).url()}
                    alt={resource.title}
                    style={{
                      width: 260,
                      display: "block",
                      height: 200,
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                ) : (
                  <div
                    className="flex flex-col items-center justify-center gap-3 p-6 bg-slate-50"
                    style={{ width: 220 }}
                  >
                    {resource.kind === "pdf" ? (
                      <FileText className="h-10 w-10 text-green-500" />
                    ) : (
                      <BookOpen className="h-10 w-10 text-slate-400" />
                    )}
                    <p className="text-sm font-medium text-slate-600 text-center line-clamp-3">
                      {resource.title}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
}
