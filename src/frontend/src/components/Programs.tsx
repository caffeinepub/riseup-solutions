import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Briefcase, Zap } from "lucide-react";
import { motion } from "motion/react";

const WHATSAPP_URL = "https://wa.me/919700429966";

const programs = [
  {
    icon: Zap,
    badge: "Most Popular",
    featured: true,
    title: "45-Day AI & Python Bootcamp",
    description:
      "An intensive, mentor-driven program covering Python fundamentals through advanced ML and real-world AI project deployment. Only 10 seats per batch for maximum mentorship.",
    highlights: [
      "Live sessions daily",
      "Real-world projects",
      "Job assistance",
      "Certificate",
      "Student portal",
    ],
    cta: "Enroll Now — ₹4,999",
    href: WHATSAPP_URL,
    external: true,
  },
  {
    icon: BookOpen,
    badge: "Flexible",
    featured: false,
    title: "Workshops & Short Courses",
    description:
      "Weekend and weekday workshops on focused topics: Data Visualization, ML for Business, Python for Automation, and more. Perfect for professionals upskilling fast.",
    highlights: [
      "1–3 day formats",
      "Expert instructors",
      "Hands-on exercises",
      "Digital certificate",
    ],
    cta: "Learn More",
    href: "#contact",
    external: false,
  },
  {
    icon: Briefcase,
    badge: "Career-Ready",
    featured: false,
    title: "Internships with Real Projects",
    description:
      "Work alongside experienced developers and data scientists on live client projects. Build a portfolio that gets you hired — not just coursework you'll never use.",
    highlights: [
      "Live client work",
      "Mentor pairing",
      "Portfolio building",
      "Performance certificate",
    ],
    cta: "Apply Now",
    href: "#contact",
    external: false,
  },
];

export default function Programs() {
  return (
    <section id="programs" className="section-pad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C04B62] text-xs font-700 tracking-widest uppercase mb-4 block">
            What We Offer
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-700 text-charcoal">
            Programs Built for
            <span style={{ color: "#C04B62" }}> Real Outcomes</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {programs.map((prog, i) => (
            <motion.div
              key={prog.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              data-ocid={`programs.card.${i + 1}`}
              className={`relative rounded-2xl p-8 flex flex-col ${
                prog.featured
                  ? "bg-[#1C1B1A] text-white shadow-[0_20px_60px_rgba(192,75,98,0.25)]"
                  : "card-white"
              }`}
            >
              {prog.featured && (
                <div
                  className="absolute inset-0 rounded-2xl opacity-20"
                  style={{
                    background:
                      "radial-gradient(circle at top right, #C04B62 0%, transparent 60%)",
                  }}
                />
              )}
              <div className="relative z-10 flex-1">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      prog.featured ? "bg-[#C04B62]" : "bg-[#C04B62]/10"
                    }`}
                  >
                    <prog.icon
                      className={`w-6 h-6 ${prog.featured ? "text-white" : "text-[#C04B62]"}`}
                    />
                  </div>
                  <Badge
                    className={`text-xs font-600 ${
                      prog.featured
                        ? "bg-[#C04B62] text-white border-0"
                        : "bg-[#F0E8E6] text-[#1C1B1A] border-0"
                    }`}
                  >
                    {prog.badge}
                  </Badge>
                </div>
                <h3
                  className={`font-display text-xl font-700 mb-3 ${
                    prog.featured ? "text-white" : "text-charcoal"
                  }`}
                >
                  {prog.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    prog.featured ? "text-[#F0C8BC]" : "text-taupe"
                  }`}
                >
                  {prog.description}
                </p>
                <ul className="flex flex-col gap-2 mb-8">
                  {prog.highlights.map((h) => (
                    <li
                      key={h}
                      className={`flex items-center gap-2 text-sm ${
                        prog.featured ? "text-[#F0C8BC]" : "text-[#C04B62]"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#C04B62]" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={prog.href}
                target={prog.external ? "_blank" : undefined}
                rel={prog.external ? "noopener noreferrer" : undefined}
                data-ocid={`programs.primary_button.${i + 1}`}
                className={`relative z-10 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-600 text-sm transition-all group ${
                  prog.featured
                    ? "bg-white text-[#1C1B1A] hover:bg-[#FAF9F7]"
                    : "btn-primary"
                }`}
              >
                {prog.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
