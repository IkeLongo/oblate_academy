// app/(site)/(legal)/privacy/page.tsx

import type { Metadata } from "next";
import LegalPage from '@/app/ui/components/legal/components/LegalPage';
import LegalToc from '@/app/ui/components/legal/components/LegalToc';
import PrivacyContent from '@/app/ui/components/legal/content/privacy-content';
import { LEGAL } from '@/app/ui/components/legal/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how River City Creatives collects, uses, and protects your personal information when you use our website and services.',
  twitter: {
    card: 'summary_large_image',
  },
  openGraph: {
    type: 'website',
    images: [
      {
        url: 'https://rivercitycreatives.com/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy | RiverCity Creatives Web Design & Branding',
      },
    ],
  },
  alternates: {
    canonical: 'https://rivercitycreatives.com/privacy', // Add your canonical URL here
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <>
      <LegalPage
        title="Website Privacy Policy"
        lastUpdated={LEGAL.lastUpdatedPrivacy}
        toc={<LegalToc />}
      >
        <PrivacyContent />
      </LegalPage>
    </>
  );
}