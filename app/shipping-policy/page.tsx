import { LegalPageShell } from "@/components/layout/legal-page-shell";
import { brand } from "@/lib/constants";

export const metadata = { title: "Shipping Policy | Phase One Labz" };

export default function ShippingPolicyPage() {
  return (
    <LegalPageShell title="Shipping Policy" lastUpdated="April 11, 2026">
      <h2>Service and cost</h2>
      <p>
        All United States orders ship via 2-day service at no cost to the customer. We do not currently
        ship outside the United States.
      </p>

      <h2>Cutoff and processing</h2>
      <p>
        Orders placed before {brand.shippingCutoff} on a business day ship the same day. Orders placed
        after the cutoff, on weekends, or on US federal holidays ship the next business day.
      </p>

      <h2>Tracking</h2>
      <p>
        You will receive a shipping confirmation email with a tracking number as soon as your order leaves
        our facility. Tracking updates are provided by the carrier and may take up to 24 hours to appear.
      </p>

      <h2>Packaging</h2>
      <p>
        All products are shipped in discreet, tamper-evident packaging. Products requiring cold-chain
        handling are packed with appropriate insulation and cold packs.
      </p>

      <h2>Lost, damaged, or incorrect orders</h2>
      <p>
        If your order arrives damaged, contaminated, or incorrect, contact {brand.supportEmail} within 48
        hours. See our{" "}
        <a href="/refund-policy" className="text-primary hover:underline">
          Refund Policy
        </a>{" "}
        for replacement details.
      </p>

      <h2>International shipping</h2>
      <p>
        We do not currently offer international shipping. Phase One Labz products may only be shipped to
        addresses within the 50 US states and US territories where research peptide shipments are
        permitted by state law.
      </p>
    </LegalPageShell>
  );
}
