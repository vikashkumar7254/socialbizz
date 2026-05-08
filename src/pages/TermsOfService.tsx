import React from "react";
import { motion } from "motion/react";
import { Scale, CreditCard, Clock, AlertCircle } from "lucide-react";

const TermsOfService: React.FC = () => {
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
            Terms of <span className="text-brand-primary">Service</span>
          </h1>
          <p className="text-brand-text-secondary max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our services.
          </p>
        </motion.div>

        <div className="space-y-12 text-brand-text-secondary leading-relaxed">
          <section className="bg-white p-8 rounded-2xl border border-brand-border shadow-soft">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-accent flex items-center justify-center text-brand-primary">
                <Scale size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold text-brand-text-primary">Agreement to Terms</h2>
            </div>
            <p>
              By accessing or using the services provided by Socialbizz Technologies, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.
            </p>
          </section>

          <section className="bg-white p-8 rounded-2xl border border-brand-border shadow-soft ring-2 ring-brand-accent">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-accent flex items-center justify-center text-brand-primary">
                <CreditCard size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold text-brand-text-primary">Payment Policy</h2>
            </div>
            <div className="bg-brand-section p-6 rounded-xl border border-brand-border mb-6">
              <p className="font-bold text-brand-text-primary mb-4">Our standard payment structure for all projects is as follows:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-brand-border">
                  <span className="block text-brand-primary font-black text-2xl mb-1">50%</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary">Advance Payment</span>
                  <p className="text-xs mt-2">Required to initiate the project and secure resources.</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-brand-border">
                  <span className="block text-brand-primary font-black text-2xl mb-1">50%</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary">Final Payment</span>
                  <p className="text-xs mt-2">Due immediately upon completion of the work and before final delivery.</p>
                </div>
              </div>
            </div>
            <p>
              All payments are non-refundable unless otherwise specified in the Refund Policy. We reserve the right to pause work if payments are not made according to the agreed schedule.
            </p>
          </section>

          <section className="bg-white p-8 rounded-2xl border border-brand-border shadow-soft">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-accent flex items-center justify-center text-brand-primary">
                <Clock size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold text-brand-text-primary">Project Timelines</h2>
            </div>
            <p>
              Estimated project timelines are provided as a guide. While we strive to meet all deadlines, timelines may be affected by delays in client feedback, content provision, or technical complexities. We will communicate any significant changes to the timeline promptly.
            </p>
          </section>

          <section className="bg-white p-8 rounded-2xl border border-brand-border shadow-soft">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-accent flex items-center justify-center text-brand-primary">
                <AlertCircle size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold text-brand-text-primary">Limitation of Liability</h2>
            </div>
            <p>
              In no event shall Socialbizz Technologies, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
            </p>
          </section>

          <div className="text-center pt-10">
            <p className="text-sm">
              Last Updated: April 14, 2026
            </p>
            <p className="text-sm mt-2">
              For any legal inquiries, please contact <a href="mailto:socialbizz.in@gmail.com" className="text-brand-primary font-bold">socialbizz.in@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
