// app/(front-end)/(public)/layout.tsx

import Navbar from "@/app/ui/shared/navbar/navbar";
import Footer from "@/app/ui/shared/foooter/footer";
import { BreadcrumbBar } from "@/app/ui/shared/breadcrumbs/BreadcrumbBar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <BreadcrumbBar />
      {children}
      <Footer />
    </>
  );
}