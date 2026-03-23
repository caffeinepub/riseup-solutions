import { Check, Flame } from "lucide-react";
import { motion } from "motion/react";

const WHATSAPP_URL = "https://wa.me/919700429966";

const inclusions = [
  "45 days of live mentor-led sessions",
  "1-on-1 mentoring with Manish Kumar Gangala",
  "6+ real-world AI projects to deploy",
  "Verified industry certificate",
  "Student portal access (lifetime materials)",
  "Career support & interview guidance",
  "Mock interviews & resume review",
  "WhatsApp community access",
];

export default function Pricing() {
  return (
    <section id="pricing" className="section-pad">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C04B62] text-xs font-700 tracking-widest uppercase mb-4 block">
            Pricing
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-700 text-charcoal">
            One Price.
            <span style={{ color: "#C04B62" }}> Everything Included.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "#1C1B1A",
            boxShadow: "0 30px 80px rgba(192,75,98,0.3)",
          }}
          data-ocid="pricing.card"
        >
          {/* Background accent */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, #C04B62 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative p-8 lg:p-12">
            {/* Urgency badge */}
            <div className="flex items-center gap-2 mb-8">
              <span className="inline-flex items-center gap-2 bg-[#C04B62] text-white text-sm font-600 px-4 py-2 rounded-full">
                <Flame className="w-4 h-4" />
                Only 3 seats left in this batch!
              </span>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-[#F0C8BC] text-3xl font-display mt-2">
                  ₹
                </span>
                <span className="font-display text-7xl font-800 text-white leading-none">
                  4,999
                </span>
              </div>
              <p className="text-[#8A7E7C] text-sm">
                One-time payment · No hidden fees · Lifetime access to materials
              </p>
            </div>

            {/* Inclusions */}
            <ul className="flex flex-col gap-3 mb-10">
              {inclusions.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[#F0C8BC] text-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-[#C04B62] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex flex-col gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="pricing.primary_button"
                className="w-full py-4 rounded-full text-center font-700 text-base text-[#1C1B1A] bg-white hover:bg-[#FAF9F7] transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                Enroll Now — Secure Your Seat
              </a>
              <a
                href="#contact"
                data-ocid="pricing.secondary_button"
                className="w-full py-4 rounded-full text-center font-600 text-sm text-[#F0C8BC] border border-[#C04B62] hover:border-[#E87272] transition-all"
              >
                Book a Free Demo Class First
              </a>
            </div>

            <p className="text-[#8A7E7C] text-xs text-center mt-6">
              Limited to 10 students per batch for personalized mentoring
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
