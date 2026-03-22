import { Award, ClipboardList, Code2 } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Apply",
    description:
      "Fill out a quick application form. We review your background and schedule a free onboarding call to ensure the program is the right fit for you.",
  },
  {
    number: "02",
    icon: Code2,
    title: "Learn & Build",
    description:
      "Attend daily live sessions with Manish Kumar Gangala. Build real AI projects, receive code reviews, and develop a professional portfolio from day one.",
  },
  {
    number: "03",
    icon: Award,
    title: "Get Hired & Certified",
    description:
      "Graduate with a verified certificate, a portfolio of deployed AI projects, and dedicated job assistance. 95% of our graduates land roles within 3 months.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C04B62] text-xs font-700 tracking-widest uppercase mb-4 block">
            The Process
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-700 text-charcoal">
            Three Steps to Your
            <span style={{ color: "#C04B62" }}> New Career</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-[#F0E8E6] via-[#C04B62] to-[#F0E8E6]" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center flex flex-col items-center"
              data-ocid={`how_it_works.card.${i + 1}`}
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-white shadow-card flex items-center justify-center border-4 border-[#F0E8E6]">
                  <step.icon className="w-10 h-10 text-[#C04B62]" />
                </div>
                <span
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-800 text-white"
                  style={{ background: "#C04B62" }}
                >
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display text-2xl font-700 text-charcoal mb-3">
                {step.title}
              </h3>
              <p className="text-taupe text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
