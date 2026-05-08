import React from "react";
import { motion } from "motion/react";
import { RefreshCcw, XCircle, CheckCircle, HelpCircle } from "lucide-react";

const RefundPolicy: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-brand-bg">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-accent text-brand-primary text-xs font-bold uppercase tracking-widest mb-6 border border-brand-border">
            Legal Information
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-text-primary mb-6">
            Refund <span className="text-brand-primary">Policy</span>
          </h1>
          <p className="text-brand-text-secondary max-w-2xl mx-auto">
            Our commitment to transparency includes a clear understanding of our refund procedures.
          </p>
        </motion.div>

        <div className="space-y-12 text-brand-text-secondary leading-relaxed">
          <section className="bg-white p-8 rounded-2xl border border-brand-border shadow-soft">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-accent flex items-center justify-center text-brand-primary">
                <RefreshCcw size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold text-brand-text-primary">General Policy</h2>
            </div>
            <p>
              At Socialbizz Technologies, we strive to ensure complete satisfaction with our digital marketing and IT services. However, due to the nature of digital services and the immediate allocation of resources, we have a structured refund policy.
            </p>
          </section>

          <section className="bg-white p-8 rounded-2xl border border-brand-border shadow-soft">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                <XCircle size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold text-brand-text-primary">Non-Refundable Situations</h2>
            </div>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <span className="font-bold text-brand-text-primary">Advance Payments:</span> The 50% advance payment is generally non-refundable as it covers the cost of initial research, resource allocation, and project setup.
              </li>
              <li>
                <span className="font-bold text-brand-text-primary">Completed Work:</span> Once a project or a specific milestone is completed and approved, no refunds will be issued for that portion of the work.
              </li>
              <li>
                <span className="font-bold text-brand-text-primary">Third-Party Costs:</span> Any costs incurred for third-party tools, advertising spend (Google Ads, Meta Ads), or domain/hosting purchases are non-refundable.
              </li>
              <li>
                <span className="font-bold text-brand-text-primary">Change of Mind:</span> Refunds are not provided if a client decides to cancel the project due to a change of mind after work has commenced.
              </li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded-2xl border border-brand-border shadow-soft">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                <CheckCircle size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold text-brand-text-primary">Refund Eligibility</h2>
            </div>
            <p className="mb-4">
              A partial refund may be considered in the following exceptional circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>If Socialbizz Technologies is unable to start the project within the agreed timeframe due to internal reasons.</li>
              <li>If there is a significant breach of contract on our part that cannot be rectified.</li>
            </ul>
            <p className="mt-4 italic">
              All refund requests must be submitted in writing to our billing department and will be reviewed on a case-by-case basis.
            </p>
          </section>

          <section className="bg-white p-8 rounded-2xl border border-brand-border shadow-soft">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-accent flex items-center justify-center text-brand-primary">
                <HelpCircle size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold text-brand-text-primary">Processing Refunds</h2>
            </div>
            <p>
              Approved refunds will be processed within 10-15 business days and will be credited back to the original payment method or via bank transfer, as agreed upon.
            </p>
          </section>

          <div className="text-center pt-10">
            <p className="text-sm">
              Last Updated: April 14, 2026
            </p>
            <p className="text-sm mt-2">
              Questions about refunds? Email us at <a href="mailto:socialbizz.in@gmail.com" className="text-brand-primary font-bold">socialbizz.in@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
