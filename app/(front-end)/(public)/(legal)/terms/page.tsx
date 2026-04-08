// app/(site)/(legal)/terms/page.tsx

import type { Metadata } from "next";
import TermsContent from '@/app/ui/components/legal/content/terms-content';
import LegalPage from '@/app/ui/components/legal/components/LegalPage';
import LegalToc from '@/app/ui/components/legal/components/LegalToc';
import { LEGAL } from '@/app/ui/components/legal/lib/constants';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Review the terms and conditions for using the Oblate Academy website.',
  twitter: {
    card: 'summary_large_image',
  },
  openGraph: {
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Terms & Conditions | Oblate Academy',
      },
    ],
  },
  alternates: {
    canonical: '/terms',
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
    </>
  );
}