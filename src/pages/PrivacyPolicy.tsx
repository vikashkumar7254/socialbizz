import React from "react";
import { motion } from "motion/react";
import { Shield, Lock, Eye, FileText } from "lucide-react";

const PrivacyPolicy: React.FC = () => {
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
            Privacy <span className="text-brand-primary">Policy</span>
          </h1>
          <p className="text-brand-text-secondary max-w-2xl mx-auto">
            Your privacy is important to us. This policy outlines how Socialbizz Technologies collects, uses, and protects your personal information.
          </p>
        </motion.div>

        <div className="space-y-12 text-brand-text-secondary leading-relaxed">
          <section className="bg-white p-8 rounded-2xl border border-brand-border shadow-soft">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-accent flex items-center justify-center text-brand-primary">
                <Shield size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold text-brand-text-primary">Information We Collect</h2>
            </div>
            <p className="mb-4">
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Inquire about our digital marketing or IT services.</li>
              <li>Subscribe to our newsletter.</li>
              <li>Fill out a contact form on our website.</li>
              <li>Communicate with us via email, phone, or WhatsApp.</li>
            </ul>
            <p className="mt-4">
              This information may include your name, email address, phone number, company name, and project details.
            </p>
          </section>

          <section className="bg-white p-8 rounded-2xl border border-brand-border shadow-soft">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-accent flex items-center justify-center text-brand-primary">
                <Eye size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold text-brand-text-primary">How We Use Your Information</h2>
            </div>
            <p className="mb-4">
              Socialbizz Technologies uses the collected data for various purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our services.</li>
              <li>To notify you about changes to our services.</li>
              <li>To provide customer support.</li>
              <li>To gather analysis or valuable information so that we can improve our services.</li>
              <li>To monitor the usage of our website.</li>
              <li>To detect, prevent and address technical issues.</li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded-2xl border border-brand-border shadow-soft">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-accent flex items-center justify-center text-brand-primary">
                <Lock size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold text-brand-text-primary">Data Security</h2>
            </div>
            <p>
              The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="bg-white p-8 rounded-2xl border border-brand-border shadow-soft">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-accent flex items-center justify-center text-brand-primary">
                <FileText size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold text-brand-text-primary">Cookies Policy</h2>
            </div>
            <p>
              We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <div className="text-center pt-10">
            <p className="text-sm">
              Last Updated: April 14, 2026
            </p>
            <p className="text-sm mt-2">
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:socialbizz.in@gmail.com" className="text-brand-primary font-bold">socialbizz.in@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
