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
  lastUpdated = process.env.NEXT_PUBLIC_TERMS_LAST_UPDATED,
  // TODO: Confirm the correct production URL for Oblate Academy.
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oblateacademy.com",
  businessLocation =
    process.env.NEXT_PUBLIC_BUSINESS_LOCATION ??
    "San Antonio, Texas, United States of America",
}: TermsContentProps) {
  return (
    <section id="terms-of-service">
      <h2 id="terms-of-use">Website Terms of Use</h2>

      <p>
        These Website Terms of Use (“Terms”) govern your access to and use of{" "}
        <a href={siteUrl} target="_blank" rel="noopener noreferrer">
          {siteUrl}
        </a>{" "}
        (the “Site”). The Site is provided by <strong><LegalCompanyName /></strong>, doing business as{" "}
        <strong><DBAName /></strong> (“we,” “us,” “our”).
      </p>

      <p>
        This Site provides Catholic educational content, resources, and informational
        material for families, parents, educators, and supporters of Catholic education.
      </p>

      <h2 id="acceptance">Acceptance of Terms</h2>
      <p>
        By accessing or using the Site, you agree to be bound by these Terms.
        If you do not agree, please do not use the Site.
      </p>

      <h2 id="site-content">Site Content and Educational Resources</h2>
      <p>
        Content on this Site is provided for informational and educational purposes only.
        We strive to ensure all content is accurate and current, but we make no guarantees
        about the completeness or timeliness of any information provided. We may update,
        modify, or remove content at any time without prior notice.
      </p>

      <h2 id="user-conduct">User Conduct</h2>
      <p>
        You agree not to misuse the Site, attempt to gain unauthorized
        access, interfere with the Site’s operation, or use the Site for
        unlawful purposes.
      </p>

      {/* LEGAL REVIEW: Review this section before publishing, particularly if the site collects any data from minors directly. */}
      <h2 id="children-and-family-use">Children and Family Use</h2>
      <p>
        Oblate Academy is designed to serve families, parents, and educators. While our content is
        family-friendly and may be accessed alongside children, we do not knowingly enter into
        agreements with or collect personal information directly from minors without appropriate
        parental or guardian involvement. By using this Site, adult users represent that they are
        at least 18 years of age, or that they are accessing the Site under appropriate parental
        or guardian supervision.
      </p>

      <h2 id="intellectual-property">Intellectual Property</h2>
      <p>
        Unless otherwise noted, all content on this Site — including text, images, graphics,
        logos, downloadable resources, and design elements — is owned by or licensed to{" "}
        <strong><LegalCompanyName /></strong> (doing business as <strong><DBAName /></strong>)
        and is protected by applicable intellectual property laws.
      </p>
      <p>
        You may not copy, reproduce, distribute, republish, or commercially exploit any content
        from this Site without our prior written permission. Personal or non-commercial educational
        use of individual materials may be permitted where clearly noted on the Site.
      </p>

      <h2 id="third-party-links">Third-Party Links</h2>
      <p>
        The Site may include links to external websites or resources
        (for example, referenced materials, social platforms, or other
        educational tools). We do not control these third parties and are not
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

      {/* LEGAL REVIEW: Confirm donation/refund policy details and which payment processor(s) Oblate Academy uses before publishing. */}
      <h2 id="donations">Donations and Payments</h2>
      <p>
        Oblate Academy may accept voluntary donations to support its Catholic educational mission.
        Donations are processed through a secure third-party payment processor (such as Stripe).
        We do not store full payment card details on our own servers.
      </p>
      <p>
        All donations are voluntary. Unless otherwise stated or required by applicable law, donations
        are non-refundable once processed. If you believe a donation was made in error, please
        contact us promptly at <BusinessEmailLink /> and we will do our best to assist you.
      </p>

      {/* LEGAL REVIEW: Confirm SMS usage details and the legal entity name for Oblate Academy before publishing. */}
      <h2 id="sms-terms">SMS Terms &amp; Conditions</h2>
      <p>
        By opting in to receive SMS messages from Oblate Academy, you agree to receive
        conversational and transactional text messages related to your inquiry, including
        follow-ups, requested information, reminders, and similar communications.
      </p>
      <p>
        You opt in by submitting a contact or inquiry form on our website and checking the
        consent checkbox to receive text messages.
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
        You must be 18 years of age or older to directly use this SMS service.
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