import React from "react";
import {
  BusinessAddressBlock,
  BusinessEmailLink,
  BusinessPhone,
  DBAName,
  LegalCompanyName,
} from "../components/LegalTokens";
import CookiePreferencesLink from "../../cookies/components/CookiePreferencesLink";

export default function PrivacyContent() {
  return (
    <>
      <h2 id="privacy-notice">Privacy Notice</h2>
      <p>
        This Privacy Policy explains how <strong><DBAName /></strong> (operated by <strong><LegalCompanyName /></strong>) collects, uses, and protects information when you visit
        our website, contact us, sign up for updates, or make a donation. We are committed to handling your
        information with care and respect. If you do not agree with this policy, please do not use our site.
      </p>

      <hr />

      <h2 id="information-we-collect">Information we collect</h2>

      <h3 id="information-you-provide">Information you provide to us</h3>
      <p>
        <strong>In Short:</strong> <em>We collect personal information you choose to share with us.</em>
      </p>
      <p>
        We collect information you voluntarily provide when you contact us, submit a form, sign up to receive
        resources or updates, make a donation, or otherwise communicate with us.
      </p>

      <p><strong>Examples may include:</strong></p>
      <ul>
        <li>Name and contact details (such as email address, phone number, or mailing address)</li>
        <li>Message content you submit through contact forms or email</li>
        <li>Information provided when signing up for resources, newsletters, or other communications</li>
        <li>Donation-related information necessary to process or acknowledge a gift</li>
      </ul>

      <p>
        <strong>Sensitive information.</strong> We do not intentionally collect or process sensitive personal information.
        Please avoid submitting sensitive information through our forms.
      </p>

      {/* LEGAL REVIEW: Confirm which payment processor(s) Oblate Academy uses for donations before publishing. */}
      <p>
        <strong>Donations.</strong> If you make a donation through our website, payment processing is handled by a
        trusted third-party payment processor (such as Stripe). <DBAName /> does not store full payment card
        details on our own servers. You can review Stripe&#39;s privacy policy at{" "}
        <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">
          https://stripe.com/privacy
        </a>
        .
      </p>

      <h3 id="information-collected-automatically">Information collected automatically</h3>
      <p>
        <strong>In Short:</strong>{" "}
        <em>Some information is collected automatically when you visit our website, such as basic device and usage data.</em>
      </p>

      <p>
        When you visit our website, we may automatically collect certain technical information that does not
        directly identify you, such as your device type, browser type, IP address, pages visited, referring pages,
        and approximate location inferred from your IP address. We use this information to maintain the security
        and performance of our site.
      </p>

      <p>
        We may use cookies and similar technologies. For details, see our{" "}
        <a href="#cookie-policy">Cookie Policy</a>.
      </p>

      {/* LEGAL REVIEW: Confirm which analytics tools are actively in use on Oblate Academy before publishing. Remove any that do not apply. */}
      <p>
        If analytics is enabled with your consent, we may use tools such as Google Analytics and Microsoft Clarity
        to better understand how visitors use our site. You can learn more here:
      </p>
      <ul>
        <li>
          <a href="https://www.google.com/policies/privacy/" target="_blank" rel="noopener noreferrer">
            https://www.google.com/policies/privacy/
          </a>
        </li>
        <li>
          <a
            href="https://marketingplatform.google.com/about/analytics/terms/us/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://marketingplatform.google.com/about/analytics/terms/us/
          </a>
        </li>
        <li>
          <a
            href="https://www.microsoft.com/en-us/privacy/privacystatement"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.microsoft.com/en-us/privacy/privacystatement
          </a>
        </li>
      </ul>

      <hr />

      <h2 id="how-we-use-information">How we use your information</h2>
      <p>
        <strong>In Short:</strong>{" "}
        <em>We use information to respond to you, share resources, process donations, improve our website, and keep things secure.</em>
      </p>

      <p>We may use your information to:</p>
      <ul>
        <li>Respond to inquiries, questions, and requests</li>
        <li>Share updates, educational resources, or other information you have requested</li>
        <li>Operate and improve the Oblate Academy website and its content</li>
        <li>Process and acknowledge donations</li>
        <li>Send administrative or service-related communications (such as confirmations or policy updates)</li>
        <li>Maintain security, prevent misuse, and troubleshoot technical issues</li>
        <li>Measure site performance through analytics, only where your consent has been given</li>
      </ul>

      <p>
        If you have opted in to receive communications from us, you can unsubscribe at any time using the link
        provided in any message we send.
      </p>

      <hr />

      {/* LEGAL REVIEW: Confirm Oblate Academy's SMS program details, including the legal entity name that should appear here, before publishing. */}
      <h2 id="sms-communications">SMS Communications</h2>

      <p>
        If you choose to opt in to receive SMS messages from <strong><DBAName /></strong> (operated by <strong><LegalCompanyName /></strong>),
        you may receive conversational and transactional messages related to your inquiry, including follow-ups,
        appointment confirmations, reminders, and scheduling coordination.
      </p>

      <p>
        You opt in to receive SMS messages by submitting a contact form on our website and explicitly checking the consent
        checkbox to receive SMS communications.
      </p>

      <p>
        Message frequency may vary depending on your interaction with us. Message and data rates may apply.
      </p>

      <p>
        You can opt out of receiving SMS messages at any time by replying <strong>STOP</strong>. For assistance,
        reply <strong>HELP</strong>.
      </p>

      <p>
        We do not sell, rent, or share your personal information, including your mobile number, with third parties
        or affiliates for marketing or promotional purposes.
      </p>

      <p>
        No mobile information will be shared with third parties or affiliates for marketing/promotional purposes.
        Information sharing to subcontractors in support services, such as customer service, is permitted.
        All other use case categories exclude text messaging originator opt-in data and consent; this information
        will not be shared with any third parties.
      </p>

      <p>
        Text messaging originator opt-in data and consent will not be shared with any third parties, except for
        aggregators and providers of the Text Message services necessary to deliver the SMS functionality.
      </p>

      <hr />

      <h2 id="sharing-information">When we share information</h2>
      <p>
        <strong>In Short:</strong>{" "}
        <em>We may share information with trusted providers who help us operate the website and fulfill our mission.</em>
      </p>

      <p>
        We may share your information with third-party vendors, contractors, or service providers who assist us in
        operating the Oblate Academy website and carrying out our work. Examples include website hosting providers,
        analytics providers, email and form delivery platforms, communications and CRM tools, and payment processors
        for donations. These providers are permitted to use your information only to perform services on our behalf
        and are required to protect it.
      </p>

      <p>We may also share information if necessary:</p>
      <ul>
        <li><strong>Legal compliance.</strong> To comply with applicable law, regulation, or legal process</li>
        <li><strong>Organizational changes.</strong> In connection with a merger, transfer, or restructuring of Oblate Academy</li>
        <li><strong>Protection.</strong> To protect our rights, the safety of our users, or the rights and safety of others</li>
      </ul>

      <hr />

      <h2 id="cookies-and-tracking">Cookies and tracking technologies</h2>
      <p>
        <em>We use cookies to keep the site running and, with your consent, to understand how it is used.</em>
      </p>

      <p>
        We use cookies and similar technologies to access or store information on your device. You can manage your
        cookie preferences at any time using our cookie settings below.
      </p>

      <hr />

      <h2 id="retention">How long we keep your information</h2>
      <p>
        <strong>In Short:</strong>{" "}
        <em>We keep your information only as long as needed for the purposes described, unless the law requires longer.</em>
      </p>

      <p>
        We retain personal information for as long as necessary to respond to requests, maintain records, fulfill
        our mission-related activities, and comply with any applicable legal obligations. When we no longer have a
        legitimate need to retain your information, we will delete or anonymize it where feasible.
      </p>

      <hr />

      <h2 id="security">How we keep your information safe</h2>
      <p>
        <strong>In Short:</strong>{" "}
        <em>We use reasonable security measures, but no method of transmission or storage is 100% secure.</em>
      </p>

      <p>
        We implement appropriate technical and organizational safeguards to protect personal information from
        unauthorized access, use, or disclosure. However, no system connected to the internet can be guaranteed
        fully secure, and you use our website at your own risk. Please contact us right away if you believe your
        information may have been compromised.
      </p>

      <hr />

      {/* LEGAL REVIEW: Review this section carefully given Oblate Academy's audience of families and children. Consider whether COPPA compliance steps are needed. */}
      <h2 id="minors">{"Children's privacy"}</h2>
      <p>
        <strong>In Short:</strong>{" "}
        <em>We do not knowingly collect personal information directly from children without appropriate parental involvement.</em>
      </p>
      <p>
        Oblate Academy is designed to serve families, parents, and educators. While our content is family-friendly
        and may be accessed by or alongside children, we do not knowingly collect personal information directly from
        children without appropriate parental consent or as otherwise permitted by applicable law. If you believe a
        child has submitted personal information to us without parental involvement, please contact us at{" "}
        <BusinessEmailLink className="underline underline-offset-4" /> and we will take appropriate steps to address it.
      </p>

      <hr />

      <h2 id="your-rights">Your privacy choices and rights</h2>
      <p>
        <strong>In Short:</strong>{" "}
        <em>Depending on your location, you may have rights to access, correct, or delete your personal information.</em>
      </p>

      <p>
        Depending on where you live, you may have certain rights under applicable privacy laws. These may include the
        right to request access to, correction of, or deletion of personal information we hold about you, and in some
        cases to object to certain processing.
      </p>

      <p>
        To make a request, contact us at{" "}
        <BusinessEmailLink className="underline underline-offset-4" />.
      </p>

      <p>
        <strong>Cookie preferences.</strong> Most browsers accept cookies by default. You can usually adjust your browser
        settings to remove or reject cookies. You can also update your cookie consent choices at any time in our{" "}
        <a href="#cookie-policy">Cookie Policy</a> section below.
      </p>

      <hr />

      <h2 id="updates">Updates to this notice</h2>
      <p>
        We may update this privacy policy from time to time to reflect changes in our practices or applicable legal
        requirements. The updated version will be effective as of the date it is posted on this page.
      </p>

      <hr />

      <h2 id="contact">How to contact us</h2>
      <p>
        If you have questions or concerns about this privacy policy, you may reach us by email at{" "}
        <BusinessEmailLink className="underline underline-offset-4" />, by phone at{" "}
        <BusinessPhone />, or by mail:
      </p>

      <BusinessAddressBlock />

      <hr />

      <h2 id="cookie-policy">Cookie Policy</h2>

      <h3>What is a cookie?</h3>
      <p>
        A cookie is a small data file stored on your computer, tablet, or smartphone when you visit a website.
        Cookies are not programs and cannot carry malware or viruses.
      </p>

      <h3>How our website uses cookies</h3>
      <p>
        Some cookies are necessary for our website to function properly. Others help us understand how visitors
        use the site, allowing us to improve the experience over time. We only use non-essential cookies with your
        consent.
      </p>

      <p>We categorize cookies as follows:</p>
      <ol>
        <li><strong>Strictly Necessary</strong> — Required for the site to function. These cannot be disabled.</li>
        <li><strong>Preferences</strong> — Remember your settings and choices to improve your experience.</li>
        <li><strong>Analytics</strong> — Help us understand how visitors use the site. Only active with your consent.</li>
      </ol>

      <h3>Managing or changing your cookie preferences</h3>
      <p>
        You can block some or all cookies by adjusting your browser settings. Please note that blocking certain
        cookies may affect features of our website that depend on them. You can opt out of Google Analytics
        cookies here:{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://tools.google.com/dlpage/gaoptout
        </a>
        .
      </p>

      <p>
        If you have previously accepted cookies, you can remove them from your browser at any time. Instructions
        vary by browser and device:
      </p>

      <ul>
        <li>
          <a
            href="https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Edge / Internet Explorer
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/en-us/105082"
            target="_blank"
            rel="noopener noreferrer"
          >
            Safari (Apple)
          </a>
        </li>
        <li>
          <a
            href="https://discover.hubpages.com/technology/How-to-delete-internet-cookies-on-your-Droid-or-any-Android-device"
            target="_blank"
            rel="noopener noreferrer"
          >
            Android
          </a>
        </li>
      </ul>

      <p>
        You can also update your cookie preferences using this link:{" "}
        <CookiePreferencesLink />
      </p>

      <p>
        <strong>Note:</strong> If you use multiple browsers, you will need to update your settings in each one
        individually.
      </p>

      <h3>Questions about cookies?</h3>
      <p>
        For any questions about our cookie policy or how we handle data, please contact us using the details
        provided in the <a href="#contact">How to contact us</a> section above.
      </p>
    </>
  );
}