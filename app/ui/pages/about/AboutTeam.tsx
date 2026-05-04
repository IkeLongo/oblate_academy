"use client";
import React from "react";
import { cn } from "@/app/lib/utils";
 
export function AboutTeam() {
  const team = [
    {
      title: "Mrs. Kammer",
      designation: "Teacher",
      src: "/avatars/mrs-kammer.png", // replace with actual image path
      excerpt:
        "A published artist with degrees in art and elementary education, Mrs. Kammer has spent over a decade nurturing young talent in Catholic schools. A devoted wife, grandmother of four, and woman of deep faith, she finds daily strength in praying the Rosary.",
    },
    {
      title: "Mrs. Maloney",
      designation: "Teacher",
      src: "/avatars/mrs-maloney.png",
      excerpt:
        "With over 30 years in Catholic education, Mrs. Maloney specializes in elementary instruction with a passion for reading and religion. Her deep devotion to the Blessed Mother is a cornerstone of her teaching and a gift she shares with every student.",
    },
    {
      title: "Mrs. Ybarra",
      designation: "Teacher",
      src: "/avatars/mrs-ybarra.png",
      excerpt:
        "A seasoned educator with 25+ years as a teacher and reading specialist, Mrs. Ybarra brings both expertise and compassion to the classroom. Inspired by her neurodivergent grandson, she is deeply committed to honoring the unique learning needs of every child.",
    },
    {
      title: "Mrs. Guillen",
      designation: "Director & Founder",
      src: "/avatars/mrs-guillen.png",
      excerpt:
        "With experience in both public and Catholic education, Mrs. Guillen has also served nearly 20 years in the nonprofit sector. As a devoted wife and mother, she leads with a heart for service, rooted deeply in her Catholic faith.",
    },
    {
      title: "Rev. David P. Uribe, OMI",
      designation: "Director of Ministry",
      src: "/avatars/rev-uribe.png",
      excerpt:
        "An ordained priest of the Missionary Oblates of Mary Immaculate, Fr. Uribe serves within a global missionary community present in over 70 countries. The Oblates are known as 'specialists in difficult missions,' bringing faith to those most in need.",
    },
  ];
  return (
    <section className="w-full bg-blue-100">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-20 lg:py-32">
        <h2 className="max-w-2xl text-3xl font-fredoka font-semibold tracking-tight text-balance text-blue-400 md:text-4xl">
          Meet the Hearts Behind Oblate Academy
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-neutral-800">
          Our educators and leaders are devoted to nurturing each child through 
          faith, virtue, and joyful learning—bringing both experience and compassion into every classroom.
        </p>
  
        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.title + "first-team-section"}
              className="overflow-hidden rounded-3xl bg-blue-50 p-1"
            >
              <img
                src={member.src}
                alt={member.title}
                height={1020}
                width={1024}
                className="aspect-square rounded-2xl object-cover shadow-sm ring-1 shadow-black/20 ring-black/20 duration-200 will-change-transform group-hover/team:scale-105"
              />
              <div className="p-2 md:p-4">
                <p className="mt-2 text-base font-semibold tracking-tight text-balance text-blue-500">
                  {member.title}
                </p>
                <p className="text-sm text-neutral-600">
                  {member.designation}
                </p>
                <Separator className="my-2" />
                <p className="text-sm text-neutral-600">
                  {member.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
function Separator({ className }: { className?: string }) {
  return (
    <svg
      className={cn(
        "h-3 w-full shrink-0 overflow-visible text-neutral-300",
        className,
      )}
      viewBox="0 0 100 1"
      preserveAspectRatio="none"
      aria-hidden
    >
      <line
        x1="0"
        y1="0.5"
        x2="100"
        y2="0.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="0.2 10"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}