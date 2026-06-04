"use client";

import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/sections/footer";
import { CheckCircle2, Clock, Mail, Globe, AlertCircle } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    businessType: "",
    services: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    // Clear the error for this field when the user starts typing
    if (errors[e.target.id]) {
      setErrors((prev) => ({ ...prev, [e.target.id]: "" }));
    }
    setSubmitError("");
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const newErrors: Record<string, string> = {};

    // Mandatory field check
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.businessName) newErrors.businessName = "Business name is required.";

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else {
      const phoneRegex = /^[+]?[\d\s-]{7,15}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number.";
      }
    }

    if (!formData.businessType) newErrors.businessType = "Please select a business type.";
    if (!formData.services) newErrors.services = "Please tell us what services you need.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      // Scroll to the first field with an error
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }

    setLoading(true);
    try {
      const { error: dbError } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            business_name: formData.businessName,
            email: formData.email,
            phone: formData.phone,
            business_type: formData.businessType,
            services_needed: formData.services
          }
        ]);

      if (dbError) throw dbError;

      setSuccess(true);
      setFormData({ name: "", businessName: "", email: "", phone: "", businessType: "", services: "" });

      // Scroll to the success message
      setTimeout(() => {
        const formTop = document.getElementById("contact-form-top");
        if (formTop) {
          formTop.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);

      setTimeout(() => setSuccess(false), 8000);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderError = (fieldId: string) => (
    <AnimatePresence>
      {errors[fieldId] && (
        <motion.div
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <div className="flex items-center gap-1.5 text-red-500 mt-2 text-[12px] font-medium">
            <AlertCircle size={14} />
            <span>{errors[fieldId]}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-canvas pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="max-w-[1024px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* LEFT SIDE */}
          <div className="flex flex-col pt-4 md:pt-8">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-6 bg-primary/40" />
              <span className="text-[11px] font-semibold text-primary tracking-[0.2em] uppercase">Contact</span>
              <div className="h-[1px] w-6 bg-primary/40" />
            </div>

            {/* Heading */}
            <h1 className="text-[32px] md:text-[44px] text-ink font-semibold tracking-tight mb-5 leading-[1.1]">
              Book Your Free<br />Strategy Call.
            </h1>

            {/* Description */}
            <p className="text-[14px] text-ink-muted mb-10 max-w-[400px] leading-[1.6]">
              Start with a free 30-minute strategy call. We'll help identify growth opportunities, automation wins, and operational improvements for your business. No pressure. No obligations. Just clarity.
            </p>

            {/* What to expect */}
            <h3 className="text-[14px] text-ink font-semibold mb-5">What to expect:</h3>
            <ul className="flex flex-col gap-4 mb-12">
              {[
                "Review your current business systems",
                "Identify growth and automation opportunities",
                "Discover quick wins with immediate impact",
                "Get a roadmap tailored to your business"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={16} strokeWidth={2} />
                  <span className="text-[13px] text-ink-muted">{item}</span>
                </li>
              ))}
            </ul>

            {/* Bottom Information */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Clock className="text-primary/70" size={16} />
                <span className="text-[12px] text-ink-muted">Average response time: Less than 24 hours</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-primary/70" size={16} />
                <a href="mailto:hello@onepilot.in" className="text-[12px] text-ink-muted hover:text-primary transition-colors">hello@onepilot.in</a>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="text-primary/70" size={16} />
                <a href="https://www.linkedin.com/company/onepilotin/" target="_blank" rel="noopener noreferrer" className="text-[12px] text-ink-muted hover:text-primary transition-colors">LinkedIn: onepilotin</a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="lg:pl-6 pt-8 lg:pt-16">
            <div className="bg-surface-1 border border-hairline rounded-[20px] p-5 md:p-8 shadow-2xl relative overflow-hidden">

              {/* Subtle background glow mimicking the reference image container */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[320px] bg-primary/5 blur-[80px] pointer-events-none" />

              <form id="contact-form-top" onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10" noValidate>

                {/* Global Form Messages */}
                {submitError && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[13px] p-3 rounded-[8px] flex items-center gap-2">
                    <AlertCircle size={16} />
                    {submitError}
                  </div>
                )}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="bg-[#E8F5E9] dark:bg-[#1B2B20] border-2 border-[#81C784] dark:border-[#388E3C] p-5 rounded-[12px] flex items-start gap-4 shadow-[0_8px_30px_rgba(76,175,80,0.2)]"
                  >
                    <CheckCircle2 size={24} className="text-[#4CAF50] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[15px] font-semibold text-ink mb-1">Strategy Call Requested!</h4>
                      <p className="text-[13px] text-ink-muted leading-[1.5]">
                        Your details have been successfully received. We will review your business information and reach out to you within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Field 1: Name */}
                <div>
                  <label htmlFor="name" className={cn("block text-[12px] font-medium mb-1.5 transition-colors", errors.name ? "text-red-500" : "text-ink")}>Name *</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={cn(
                      "w-full bg-surface-2 border rounded-[8px] px-3.5 py-2.5 text-ink text-[13px] placeholder:text-ink-tertiary outline-none transition-all",
                      errors.name ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-hairline focus:border-primary focus:ring-1 focus:ring-primary"
                    )}
                  />
                  {renderError("name")}
                </div>

                {/* Field 2: Business Name */}
                <div>
                  <label htmlFor="businessName" className={cn("block text-[12px] font-medium mb-1.5 transition-colors", errors.businessName ? "text-red-500" : "text-ink")}>Business Name *</label>
                  <input
                    type="text"
                    id="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className={cn(
                      "w-full bg-surface-2 border rounded-[8px] px-3.5 py-2.5 text-ink text-[13px] placeholder:text-ink-tertiary outline-none transition-all",
                      errors.businessName ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-hairline focus:border-primary focus:ring-1 focus:ring-primary"
                    )}
                  />
                  {renderError("businessName")}
                </div>

                {/* Field 3: Email */}
                <div>
                  <label htmlFor="email" className={cn("block text-[12px] font-medium mb-1.5 transition-colors", errors.email ? "text-red-500" : "text-ink")}>Email *</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className={cn(
                      "w-full bg-surface-2 border rounded-[8px] px-3.5 py-2.5 text-ink text-[13px] placeholder:text-ink-tertiary outline-none transition-all",
                      errors.email ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-hairline focus:border-primary focus:ring-1 focus:ring-primary"
                    )}
                  />
                  {renderError("email")}
                </div>

                {/* Field 4: Phone */}
                <div>
                  <label htmlFor="phone" className={cn("block text-[12px] font-medium mb-1.5 transition-colors", errors.phone ? "text-red-500" : "text-ink")}>Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className={cn(
                      "w-full bg-surface-2 border rounded-[8px] px-3.5 py-2.5 text-ink text-[13px] placeholder:text-ink-tertiary outline-none transition-all",
                      errors.phone ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-hairline focus:border-primary focus:ring-1 focus:ring-primary"
                    )}
                  />
                  {renderError("phone")}
                </div>

                {/* Field 5: Business Type */}
                <div>
                  <label htmlFor="businessType" className={cn("block text-[12px] font-medium mb-1.5 transition-colors", errors.businessType ? "text-red-500" : "text-ink")}>Business Type *</label>
                  <div className="relative">
                    <select
                      id="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className={cn(
                        "w-full bg-surface-2 border rounded-[8px] px-3.5 py-2.5 text-[13px] appearance-none outline-none transition-all",
                        formData.businessType === "" ? "text-ink-tertiary" : "text-ink",
                        errors.businessType ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-hairline focus:border-primary focus:ring-1 focus:ring-primary"
                      )}
                    >
                      <option value="" disabled>Select type</option>
                      <option value="Startup">Startup</option>
                      <option value="SaaS">SaaS</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Education">Education</option>
                      <option value="Finance">Finance</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Agency">Agency</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none">
                      <svg width="10" height="6" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke={errors.businessType ? "#ef4444" : "#6B6B70"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  {renderError("businessType")}
                </div>

                {/* Field 6: What services you want to opt for? */}
                <div>
                  <label htmlFor="services" className={cn("block text-[12px] font-medium mb-1.5 transition-colors", errors.services ? "text-red-500" : "text-ink")}>What services you want to opt for? *</label>
                  <textarea
                    id="services"
                    value={formData.services}
                    onChange={handleChange}
                    rows={4}
                    placeholder="What is the biggest challenge currently limiting your business growth?"
                    className={cn(
                      "w-full bg-surface-2 border rounded-[8px] px-3.5 py-2.5 text-ink text-[13px] placeholder:text-ink-tertiary outline-none transition-all resize-none",
                      errors.services ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-hairline focus:border-primary focus:ring-1 focus:ring-primary"
                    )}
                  ></textarea>
                  {renderError("services")}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-3 bg-gradient-to-r from-[#9381FF] to-[#B892FF] text-white font-medium text-[14px] py-3 rounded-[10px] hover:shadow-[0_0_24px_rgba(147,129,255,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Book My Strategy Call"
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
