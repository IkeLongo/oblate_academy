import React from "react";
import {
  BusinessEmailLink,
  DBAName,
  LegalCompanyName,
  BusinessPhone,
  BusinessAddressBlock,
} from "../components/LegalTokens";

type TermsContentProps = {
  lastUpdated?: string;
  siteUrl?: string;
  businessLocation?: string;
};

export default function TermsContent({
  lastUpdated = process.env.NEXT_PUBLIC_TERMS_LAST_UPDATED ?? "March 9, 2026",
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rivercitycreatives.com",
  businessLocation =
    process.env.NEXT_PUBLIC_BUSINESS_LOCATION ??
    "San Antonio, Texas, United States of America",
}: TermsContentProps) {
  return (
    <section id="terms-of-service">
      <h2 id="terms-of-use">Website Terms of Use</h2>

      <p>
        <strong>Last Updated:</strong> {lastUpdated}
      </p>

      <p>
        These Website Terms of Use (“Terms”) govern your access to and use of{" "}
        <a href={siteUrl} target="_blank" rel="noopener noreferrer">
          {siteUrl}
        </a>{" "}
        (the “Site”). The Site is provided by <strong><LegalCompanyName /></strong>, doing business as{" "}
        <strong><DBAName /></strong> (“we,” “us,” “our”).
      </p>

      <p>
        This Site is intended to provide general information about our gym,
        training programs, schedules, and services.{" "}
        <strong>No purchases or transactions are processed directly on this Site.</strong>
      </p>

      <h2 id="acceptance">Acceptance of Terms</h2>
      <p>
        By accessing or using the Site, you agree to be bound by these Terms.
        If you do not agree, please do not use the Site.
      </p>

      <h2 id="informational-use">Informational and Promotional Use</h2>
      <p>
        Content on this Site is provided for informational and promotional
        purposes only. We may update, change, or remove content at any time
        without notice, including class schedules, pricing, promotions,
        and program details.
      </p>

      <h2 id="user-conduct">User Conduct</h2>
      <p>
        You agree not to misuse the Site, attempt to gain unauthorized
        access, interfere with the Site’s operation, or use the Site for
        unlawful purposes.
      </p>

      <h2 id="scope-of-services">Scope of Services</h2>
      <p>
        We offer web design, web development, branding, and hosting services. The scope, timeline, and deliverables for each project will be outlined
        in a separate agreement between us and the client.
      </p>
      <h3 id="web-design-development">Web Design & Development</h3>
      <ul>
        <li>Clients must provide all required content and assets in a timely manner.</li>
        <li>Revisions are limited to the number specified in the service agreement.</li>
      </ul>
      <h3 id="branding">Branding</h3>
      <ul>
        <li>Deliverables may include logos, brand guidelines, and marketing materials as agreed upon.</li>
        <li>Clients must ensure they have the rights to any assets provided to us.</li>
      </ul>
      <h3 id="hosting-services">Hosting Services</h3>
      <ul>
        <li>Hosting services are subject to third-party provider terms and may require periodic maintenance and updates.</li>
        <li>We are not liable for service interruptions due to factors beyond our control (e.g., server downtime, third-party failures).</li>
      </ul>

      <h2 id="intellectual-property">Intellectual Property</h2>
      <p>
        Unless otherwise stated, the Site and its content (including text,
        images, graphics, logos, and design elements) are owned by{" "}
        <strong><LegalCompanyName /></strong> and are protected by
        intellectual property laws. You may not copy, reproduce,
        or distribute Site content without our written permission.
      </p>

      <h2 id="third-party-links">Third-Party Links</h2>
      <p>
        The Site may include links to third-party websites or services
        (for example, social platforms, scheduling tools, or map
        providers). We do not control these third parties and are not
        responsible for their content, policies, or practices. Your use
        of third-party sites is at your own risk and subject to their terms.
      </p>

      <h2 id="privacy-and-cookies">Privacy and Cookies</h2>
      <p>
        Our collection and use of personal information is described in
        our <a href="/privacy">Privacy Policy</a>. We may use cookies and
        similar technologies; you can review details in our cookie
        section (where available) and manage your cookie preferences
        through the Site’s cookie settings.
      </p>

      <h2 id="sms-terms">SMS Terms &amp; Conditions</h2>
      <p>
        By opting in to receive SMS messages from RiverCity Creatives (operated by Inventive Collective LLC), you agree to receive conversational and transactional messages related to your inquiry, including follow-ups, appointment confirmations, and scheduling coordination.
      </p>
      <p>
        To stop receiving messages, reply <strong>STOP</strong> to any text message.
      </p>
      <p>
        For assistance, reply <strong>HELP</strong> or contact us directly through our website.
      </p>
      <p>
        Message frequency may vary depending on your interaction with us.
      </p>
      <p>
        Message and data rates may apply. Check with your carrier for details.
      </p>
      <p>
        Carriers are not liable for delayed or undelivered messages.
      </p>
      <p>
        You must be 18 years of age or older to use this SMS service.
      </p>

      <h2 id="disclaimer-of-warranties">Disclaimer of Warranties</h2>
      <p>
        The Site is provided on an “as is” and “as available” basis.
        We make no warranties, express or implied, about the accuracy,
        completeness, or reliability of the Site or its content.
      </p>

      <h2 id="limitation-of-liability">Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law,{" "}
        <strong><LegalCompanyName /></strong> will not be liable for
        any indirect, incidental, special, consequential, or punitive
        damages arising from or related to your use of (or inability
        to use) the Site, including reliance on Site content.
      </p>

      <h2 id="changes-to-terms">Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. The “Last Updated”
        date reflects the most recent revision. Your continued use of
        the Site after changes are posted constitutes acceptance of
        the updated Terms.
      </p>

      <h2 id="governing-law">Governing Law</h2>
      <p>
        These Terms are governed by the laws applicable in{" "}
        <strong>{businessLocation}</strong>, without regard to
        conflict-of-law principles.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        If you have questions about these Terms, contact us by email at{" "}
        <BusinessEmailLink />, by phone at <BusinessPhone />, or by mail:
      </p>

      <BusinessAddressBlock />
    </section>
  );
}