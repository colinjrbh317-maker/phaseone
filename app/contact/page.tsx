"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { contactCopy, brand } from "@/lib/constants";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: wire to /api/contact → Supabase contact_submissions + Resend notification (Track D)
    console.log("Contact form submission:", form);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20 bg-background min-h-screen">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h1
            className="font-heading font-black tracking-tighter uppercase text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-5 tracking-tight"
            
          >
            {contactCopy.h1}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-16">
            {contactCopy.subhead}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {/* Email column */}
            <div className="md:col-span-2">
              <div className="card-organic p-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 text-primary mb-4">
                  <Mail size={18} />
                </div>
                <h3
                  className="font-heading font-black tracking-tighter uppercase font-bold text-xl text-foreground mb-2"
                  
                >
                  {contactCopy.emailSection.h3}
                </h3>
                <a
                  href={`mailto:${brand.supportEmail}`}
                  className="text-sm text-primary font-semibold hover:underline break-all"
                >
                  {brand.supportEmail}
                </a>
                <p className="text-xs text-muted-foreground mt-3">
                  We respond within {brand.responseSLA}.
                </p>
              </div>
            </div>

            {/* Form column */}
            <div className="md:col-span-3">
              <div className="card-organic p-6 md:p-8">
                <h3
                  className="font-heading font-black tracking-tighter uppercase font-bold text-xl text-foreground mb-1"
                  
                >
                  {contactCopy.formSection.h3}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {contactCopy.formSection.body}
                </p>

                {submitted ? (
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 border border-primary/40 px-4 py-3 text-sm text-foreground">
                    <Check size={16} className="text-primary" />
                    {contactCopy.formSection.success}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        {contactCopy.formSection.fields.name.label}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={contactCopy.formSection.fields.name.placeholder}
                        className="w-full rounded-lg border border-border bg-background px-4 h-11 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        {contactCopy.formSection.fields.email.label}
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder={contactCopy.formSection.fields.email.placeholder}
                        className="w-full rounded-lg border border-border bg-background px-4 h-11 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        {contactCopy.formSection.fields.message.label}
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={contactCopy.formSection.fields.message.placeholder}
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 rounded-full gradient-button px-6 h-11 text-sm font-semibold glow-primary-hover transition-shadow disabled:opacity-50"
                    >
                      {submitting ? "Sending..." : contactCopy.formSection.submit}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
