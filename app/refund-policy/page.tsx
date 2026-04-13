import { LegalPageShell } from "@/components/layout/legal-page-shell";
import { brand } from "@/lib/constants";

export const metadata = { title: "Refund Policy | Phase One Labz" };

export default function RefundPolicyPage() {
  return (
    <LegalPageShell title="Refund Policy" lastUpdated="April 11, 2026">
      <p>
        Due to the nature of research chemicals and the requirement that they be used solely for laboratory
        research, <strong>all sales are final once an order ships.</strong>
      </p>

      <h2>Damaged or mislabeled products</h2>
      <p>
        If your order arrives damaged, contaminated, or mislabeled, contact our support team at{" "}
        {brand.supportEmail} within 48 hours of delivery. Include your order number and photos of the
        affected product. We will replace the item at no charge or issue a full refund for the affected line
        item.
      </p>

      <h2>Lost or missing shipments</h2>
      <p>
        If tracking shows your package was delivered but you did not receive it, contact us within 7 days.
        We will work with the carrier to investigate and, if appropriate, reship the order.
      </p>

      <h2>Cancellations</h2>
      <p>
        Orders may be canceled for a full refund prior to shipment. Once an order has shipped, it cannot
        be canceled or returned.
      </p>

      <h2>Contact</h2>
      <p>Email {brand.supportEmail} for any refund or order issue.</p>
    </LegalPageShell>
  );
}
