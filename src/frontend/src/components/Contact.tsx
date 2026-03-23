import { CheckCircle, Loader2, Mail, MessageSquare, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { InquiryType } from "../backend";
import { useSubmitContactForm } from "../hooks/useQueries";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    inquiryType: InquiryType.general,
  });
  const { mutate, isPending, isSuccess, isActorReady } = useSubmitContactForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isActorReady) {
      toast.error(
        "Still connecting to the server. Please wait a moment and try again.",
      );
      return;
    }
    const submission = {
      ...form,
      submittedAt: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
    mutate(submission, {
      onSuccess: () => {
        toast.success("Message sent! We'll get back to you within 24 hours.");
        setForm({
          name: "",
          email: "",
          message: "",
          inquiryType: InquiryType.general,
        });
      },
      onError: (err) => {
        console.error("Contact form error:", err);
        toast.error(
          "Something went wrong. Please try again or email us directly at riseupsolutions@zohomail.in",
        );
      },
    });
  };

  const isDisabled = isPending || !isActorReady;

  return (
    <section id="contact" className="section-pad section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C04B62] text-xs font-700 tracking-widest uppercase mb-4 block">
            Contact Us
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-700 text-charcoal">
            Let's Start a<span style={{ color: "#C04B62" }}> Conversation</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#C04B62] text-lg leading-relaxed mb-10">
              Whether you're a student looking to enroll, a business seeking BPO
              or AI solutions, or just have a question — we'd love to hear from
              you.
            </p>
            <div className="flex flex-col gap-5">
              <a
                href="mailto:riseupsolutions@zohomail.in"
                data-ocid="contact.link"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#C04B62]/10 flex items-center justify-center group-hover:bg-[#C04B62] transition-colors">
                  <Mail className="w-5 h-5 text-[#C04B62] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs text-taupe uppercase tracking-wide">
                    Email
                  </div>
                  <div className="font-500 text-charcoal text-sm">
                    riseupsolutions@zohomail.in
                  </div>
                </div>
              </a>
              <a
                href="tel:+919988769850"
                data-ocid="contact.link"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#C04B62]/10 flex items-center justify-center group-hover:bg-[#C04B62] transition-colors">
                  <Phone className="w-5 h-5 text-[#C04B62] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs text-taupe uppercase tracking-wide">
                    Phone
                  </div>
                  <div className="font-500 text-charcoal text-sm">
                    +91 9988769850
                  </div>
                </div>
              </a>
              <a
                href="https://wa.me/919170042996"
                data-ocid="contact.link"
                className="flex items-center gap-4 group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#C04B62]/10 flex items-center justify-center group-hover:bg-[#C04B62] transition-colors">
                  <MessageSquare className="w-5 h-5 text-[#C04B62] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs text-taupe uppercase tracking-wide">
                    WhatsApp
                  </div>
                  <div className="font-500 text-charcoal text-sm">
                    +91 9170042996
                  </div>
                </div>
              </a>
            </div>
            <div className="mt-10 p-6 rounded-2xl bg-white border border-[#F0E8E6]">
              <p className="text-xs text-taupe uppercase tracking-wide mb-2">
                Student Portal
              </p>
              <a
                href="http://dashboard.riseupsolutions.com"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.link"
                className="text-[#C04B62] font-500 hover:underline"
              >
                dashboard.riseupsolutions.com
              </a>
              <p className="text-xs text-taupe mt-2">
                Track progress, access materials, download certificates
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="card-white p-8 flex flex-col gap-5"
              data-ocid="contact.modal"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-600 text-charcoal uppercase tracking-wide mb-2"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Rajan Sharma"
                  data-ocid="contact.input"
                  className="w-full px-4 py-3 rounded-xl border border-[#F0E8E6] bg-[#FAF9F7] text-charcoal placeholder:text-taupe focus:outline-none focus:ring-2 focus:ring-[#C04B62]/30 focus:border-[#C04B62] transition-all text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-600 text-charcoal uppercase tracking-wide mb-2"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="you@email.com"
                  data-ocid="contact.input"
                  className="w-full px-4 py-3 rounded-xl border border-[#F0E8E6] bg-[#FAF9F7] text-charcoal placeholder:text-taupe focus:outline-none focus:ring-2 focus:ring-[#C04B62]/30 focus:border-[#C04B62] transition-all text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-inquiry"
                  className="block text-xs font-600 text-charcoal uppercase tracking-wide mb-2"
                >
                  Inquiry Type
                </label>
                <select
                  id="contact-inquiry"
                  value={form.inquiryType}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      inquiryType: e.target.value as InquiryType,
                    }))
                  }
                  data-ocid="contact.select"
                  className="w-full px-4 py-3 rounded-xl border border-[#F0E8E6] bg-[#FAF9F7] text-charcoal focus:outline-none focus:ring-2 focus:ring-[#C04B62]/30 focus:border-[#C04B62] transition-all text-sm"
                >
                  <option value={InquiryType.general}>General Inquiry</option>
                  <option value={InquiryType.support}>Support</option>
                  <option value={InquiryType.feedback}>Feedback</option>
                  <option value={InquiryType.partnership}>
                    Partnership / Business
                  </option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-600 text-charcoal uppercase tracking-wide mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Tell us about your goals or requirements..."
                  data-ocid="contact.textarea"
                  className="w-full px-4 py-3 rounded-xl border border-[#F0E8E6] bg-[#FAF9F7] text-charcoal placeholder:text-taupe focus:outline-none focus:ring-2 focus:ring-[#C04B62]/30 focus:border-[#C04B62] transition-all text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isDisabled}
                data-ocid="contact.submit_button"
                className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" />{" "}
                    Sending...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 inline mr-2" /> Message
                    Sent!
                  </>
                ) : !isActorReady ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" />{" "}
                    Connecting...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
