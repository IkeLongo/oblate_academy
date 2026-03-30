/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { FileText, BookOpen, PlayCircle, Link2 } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import type { ModalResource } from "./ResourceModal";

type Props = {
  resource: ModalResource;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTapHint?: boolean;
  onPreviewClick?: () => void;
};

export function ResourceHoverCard({ resource, children, open: controlledOpen, onOpenChange, showTapHint, onPreviewClick }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [linkPreview, setLinkPreview] = useState<{ image: string | null } | null>(null);
  const fetchedRef = useRef(false);

  const isControlled = controlledOpen !== undefined;
  const effectiveOpen = isControlled ? controlledOpen : isOpen;

  useEffect(() => {
    if (!effectiveOpen || resource.kind !== "link" || !resource.url || fetchedRef.current) return;
    fetchedRef.current = true;
    const controller = new AbortController();
    fetch(`https://api.microlink.io?url=${encodeURIComponent(resource.url)}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => setLinkPreview({ image: data?.data?.image?.url ?? null }))
      .catch(() => setLinkPreview({ image: null }));
    return () => controller.abort();
  }, [effectiveOpen, resource.kind, resource.url]);

  const x = useMotionValue(0);
  const translateX = useSpring(x, { stiffness: 150, damping: 15 });

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetFromCenter = (event.clientX - rect.left - rect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  return (
      <HoverCardPrimitive.Root
        {...(isControlled
          ? { open: controlledOpen, onOpenChange }
          : { openDelay: 300, closeDelay: 100, onOpenChange: setIsOpen }
        )}
      >
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
            {effectiveOpen && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.92 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 20 },
                }}
                exit={{ opacity: 0, y: 12, scale: 0.92 }}
                className={`rounded-xl shadow-xl overflow-hidden bg-white border border-neutral-200${onPreviewClick ? " cursor-pointer" : ""}`}
                style={{ x: translateX }}
                onClick={onPreviewClick}
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
                ) : resource.kind === "pdf" && resource.pdfThumbnail ? (
                  <img
                    src={urlFor(resource.pdfThumbnail).width(520).url()}
                    alt={resource.title}
                    style={{
                      width: 260,
                      display: "block",
                      height: 200,
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                ) : resource.kind === "richText" && Array.isArray(resource.body) ? (
                  <div
                    className="bg-white p-4 flex flex-col justify-center gap-2"
                    style={{ width: 260, height: 200, overflow: "hidden" }}
                  >
                    <BookOpen className="h-5 w-5 text-slate-400 shrink-0" />
                    <p
                      className="text-slate-600 text-sm leading-relaxed"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 6,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        fontFamily: "Poppins, Arial, sans-serif",
                      }}
                    >
                      {resource.body
                        .filter((b) => b._type === "block" && Array.isArray(b.children))
                        .map((b) => b.children.map((c: any) => c.text).join(""))
                        .join(" ")}
                    </p>
                  </div>
                ) : resource.kind === "video" && resource.muxVideo?.asset?.playbackId ? (
                  <div style={{ width: 260, height: 200, position: "relative" }}>
                    <img
                      src={`https://image.mux.com/${resource.muxVideo.asset.playbackId}/thumbnail.jpg?width=520&fit_mode=crop&time=0`}
                      alt={resource.title}
                      style={{
                        width: 260,
                        display: "block",
                        height: 200,
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0,0,0,0.25)",
                      }}
                    >
                      <PlayCircle className="h-12 w-12 text-white drop-shadow-lg" />
                    </div>
                  </div>
                ) : resource.kind === "link" ? (
                  linkPreview === null ? (
                    // Loading shimmer
                    <div className="animate-pulse bg-slate-200" style={{ width: 260, height: 200 }} />
                  ) : linkPreview.image ? (
                    <div style={{ width: 260, height: 200, position: "relative" }}>
                      <img
                        src={linkPreview.image}
                        alt={resource.title}
                        style={{ width: 260, height: 200, display: "block", objectFit: "cover" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(0,0,0,0.18)",
                        }}
                      >
                        <Link2 className="h-10 w-10 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="flex flex-col items-center justify-center gap-3 p-6 bg-slate-50"
                      style={{ width: 220 }}
                    >
                      <Link2 className="h-10 w-10 text-blue-400" />
                      <p className="text-sm font-medium text-slate-600 text-center line-clamp-3">
                        {resource.title}
                      </p>
                    </div>
                  )
                ) : (
                  <div
                    className="flex flex-col items-center justify-center gap-3 p-6 bg-slate-50"
                    style={{ width: 220 }}
                  >
                    {resource.kind === "pdf" ? (
                      <FileText className="h-10 w-10 text-green-500" />
                    ) : resource.kind === "video" ? (
                      <PlayCircle className="h-10 w-10 text-purple-400" />
                    ) : (
                      <BookOpen className="h-10 w-10 text-slate-400" />
                    )}
                    <p className="text-sm font-medium text-slate-600 text-center line-clamp-3">
                      {resource.title}
                    </p>
                  </div>
                )}
                {showTapHint && (
                  <div className="px-3 py-2 bg-slate-50 border-t border-neutral-100 text-center">
                    <p className="text-xs text-slate-400 font-medium">Tap preview to open →</p>
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
