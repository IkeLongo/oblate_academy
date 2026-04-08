// app/(site)/(legal)/privacy/page.tsx

import type { Metadata } from "next";
import LegalPage from '@/app/ui/components/legal/components/LegalPage';
import LegalToc from '@/app/ui/components/legal/components/LegalToc';
import PrivacyContent from '@/app/ui/components/legal/content/privacy-content';
import { LEGAL } from '@/app/ui/components/legal/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how Oblate Academy collects, uses, and protects your personal information when you visit our website.',
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
        alt: 'Privacy Policy | Oblate Academy',
      },
    ],
  },
  alternates: {
    canonical: '/privacy',
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