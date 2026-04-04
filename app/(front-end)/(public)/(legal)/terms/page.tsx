// app/(site)/(legal)/terms/page.tsx

import type { Metadata } from "next";
import TermsContent from '@/app/ui/components/legal/content/terms-content';
import LegalPage from '@/app/ui/components/legal/components/LegalPage';
import LegalToc from '@/app/ui/components/legal/components/LegalToc';
import Footer from "@/app/ui/shared/foooter/footer";
import { LEGAL } from '@/app/ui/components/legal/lib/constants';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: "Review the terms and conditions for using River City Creatives' website and services.",
  twitter: {
    card: 'summary_large_image',
  },
  openGraph: {
    type: 'website',
    images: [
      {
        url: 'https://rivercitycreatives.com/opengraph-image.png', // Custom OpenGraph image for the booking page
        width: 1200,
        height: 630,
        alt: 'Terms & Conditions | RiverCity Creatives Web Design & Branding',
      },
    ],
  },
  alternates: {
    canonical: 'https://rivercitycreatives.com/terms', // Add your canonical URL here
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function TermsPage() {
  return (
    <>
      <LegalPage
        title="Terms & Conditions"
        lastUpdated={LEGAL.lastUpdatedTerms}
        toc={<LegalToc />}
      >
        <TermsContent />
      </LegalPage>
      <Footer />
    </>
  );
}