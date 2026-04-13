import { LegalPageShell } from "@/components/layout/legal-page-shell";
import { brand } from "@/lib/constants";

export const metadata = { title: "Privacy Policy | Phase One Labz" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell title="Privacy Policy" lastUpdated="April 11, 2026">
      <p>
        This Privacy Policy describes how {brand.legalName} (&ldquo;Phase One Labz,&rdquo; &ldquo;we,&rdquo;
        &ldquo;us&rdquo;) collects, uses, and discloses information when you visit, use, or make a purchase
        from phaseonelabz.com (the &ldquo;Site&rdquo;).
      </p>

      <h2>1. Information we collect</h2>
      <p>
        We collect information you provide directly to us when you create an account, place an order, sign
        up for the Labz Club waitlist, contact support, or complete the research pathway quiz. This includes
        your name, email address, shipping address, and any order details.
      </p>
      <p>
        We also automatically collect certain information when you visit the Site, including your IP
        address, browser type, pages viewed, and device identifiers. This data is collected using cookies,
        web beacons, and analytics tools (Microsoft Clarity and Vercel Analytics).
      </p>

      <h2>2. How we use information</h2>
      <p>
        We use collected information to process orders, communicate about orders and research compliance,
        send support responses, operate the Labz Club program, and improve the Site.
      </p>

      <h2>3. How we share information</h2>
      <p>
        We share information only with service providers necessary to operate the Site (payment processor,
        shipping carrier, email provider, analytics) and when required by law. We do not sell your personal
        information.
      </p>

      <h2>4. Your choices</h2>
      <p>
        You may request access, correction, or deletion of your personal information at any time by
        contacting us at {brand.supportEmail}.
      </p>

      <h2>5. Research compliance</h2>
      <p>
        Because Phase One Labz sells research materials only, we require all customers to affirm that
        purchases are for laboratory, academic, or institutional research and not for human or animal use.
        This affirmation may be retained in our records for compliance purposes.
      </p>

      <h2>6. Contact</h2>
      <p>
        Questions about this Privacy Policy? Email {brand.supportEmail}.
      </p>
    </LegalPageShell>
  );
}
