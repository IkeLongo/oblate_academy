// app/(front-end)/(public)/layout.tsx

import Navbar from "@/app/ui/shared/navbar/navbar";
import Footer from "@/app/ui/shared/foooter/footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}