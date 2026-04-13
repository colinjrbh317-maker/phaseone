import { LegalPageShell } from "@/components/layout/legal-page-shell";
import { brand } from "@/lib/constants";

export const metadata = { title: "Terms of Service | Phase One Labz" };

export default function TermsOfServicePage() {
  return (
    <LegalPageShell title="Terms of Service" lastUpdated="April 11, 2026">
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the Phase One Labz
        website and all products sold through it. By accessing or using the Site, you agree to these Terms.
      </p>

      <h2>1. Research Use Only</h2>
      <p>
        <strong>
          All products sold by {brand.legalName} are intended strictly for research, laboratory, and
          analytical purposes only. Products are not for human consumption of any kind and are not approved
          by the U.S. Food and Drug Administration (FDA) for human or medical use. Under no circumstances
          should any product be used for purposes other than research.
        </strong>
      </p>
      <p>
        The statements made on this website have not been evaluated by the FDA. The products offered by
        Phase One Labz are not intended to diagnose, treat, cure, or prevent any disease.
      </p>
      <p>
        Phase One Labz is not a compounding pharmacy or chemical compounding facility as defined under 503A
        of the Federal Food, Drug, and Cosmetic Act, nor an outsourcing facility as defined under 503B.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        By purchasing from Phase One Labz, you represent that you are at least 21 years of age, a qualified
        researcher or institutional professional, and that all products purchased are strictly for lawful
        Research Use Only. You accept full responsibility for compliance with all applicable federal, state,
        and local laws and regulations.
      </p>

      <h2>3. Orders and Payment</h2>
      <p>
        All orders are subject to acceptance and product availability. Prices are in US dollars and subject
        to change without notice. We reserve the right to refuse or cancel any order.
      </p>

      <h2>4. Shipping</h2>
      <p>
        Orders ship only within the United States via 2-day service. Orders placed before 3 PM ET ship the
        same business day. Shipping is free on all orders.
      </p>

      <h2>5. Returns</h2>
      <p>
        Due to the nature of research chemicals, all sales are final once an order ships. Damaged or
        mislabeled products will be replaced if reported within 48 hours of delivery. See our{" "}
        <a href="/refund-policy" className="text-primary hover:underline">
          Refund Policy
        </a>{" "}
        for details.
      </p>

      <h2>6. Liability</h2>
      <p>
        To the fullest extent permitted by law, Phase One Labz is not liable for any direct, indirect,
        incidental, or consequential damages arising from the use or misuse of any product purchased from
        the Site. By purchasing, you assume all risks associated with handling research materials and agree
        to hold {brand.legalName} harmless from any claims or liabilities.
      </p>

      <h2>7. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the United States and the state in which {brand.legalName}{" "}
        is registered, without regard to conflict of law principles.
      </p>

      <h2>8. Contact</h2>
      <p>Questions? Email {brand.supportEmail}.</p>
    </LegalPageShell>
  );
}
