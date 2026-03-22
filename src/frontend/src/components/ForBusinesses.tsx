import { ArrowRight, Phone } from "lucide-react";
import { motion } from "motion/react";

export default function ForBusinesses() {
  return (
    <section id="for-businesses" className="section-pad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden px-8 py-20 text-center"
          style={{
            background: "linear-gradient(135deg, #1C1B1A 0%, #C04B62 100%)",
            boxShadow: "0 30px 80px rgba(192,75,98,0.3)",
          }}
        >
          {/* Background orbs */}
          <div
            className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, #E87272 0%, transparent 70%)",
              filter: "blur(80px)",
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-15"
            style={{
              background:
                "radial-gradient(circle, #E87272 0%, transparent 70%)",
              filter: "blur(60px)",
              transform: "translate(40%, 40%)",
            }}
          />

          <div className="relative z-10">
            <span className="inline-block text-[#F9D0C4] text-xs font-700 tracking-widest uppercase mb-6">
              For Businesses
            </span>
            <h2 className="font-display text-4xl lg:text-6xl font-700 text-white leading-tight mb-6">
              Scale Your Business
              <br />
              <span style={{ color: "#F9D0C4" }}>with RiseUp</span>
            </h2>
            <p className="text-[#F0C8BC] text-lg max-w-2xl mx-auto mb-10">
              Whether you need reliable BPO operations, cutting-edge AI
              solutions, or a pipeline of trained tech talent — RiseUp delivers
              enterprise-grade results with startup agility.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                data-ocid="businesses.primary_button"
                className="inline-flex items-center gap-2 bg-white text-[#1C1B1A] font-700 px-8 py-4 rounded-full hover:bg-[#FAF9F7] transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+919988769850"
                data-ocid="businesses.secondary_button"
                className="inline-flex items-center gap-2 border-2 border-[#F9D0C4] text-[#F9D0C4] font-700 px-8 py-4 rounded-full hover:bg-white/10 transition-all"
              >
                <Phone className="w-4 h-4" />
                Schedule a Call
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
