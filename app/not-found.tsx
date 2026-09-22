import type { Metadata } from "next";
import NotFoundHero from "@/app/ui/pages/not-found/NotFoundHero";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return <NotFoundHero />;
}
