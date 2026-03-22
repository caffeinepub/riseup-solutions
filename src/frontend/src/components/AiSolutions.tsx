import { ArrowRight, Bot, Cpu, Globe, Workflow } from "lucide-react";
import { motion } from "motion/react";

const solutions = [
  {
    icon: Bot,
    title: "Custom AI Chatbots",
    description:
      "Intelligent, context-aware chatbots trained on your data — for customer service, internal ops, or sales.",
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description:
      "Automate repetitive workflows with Python and AI: document processing, reporting, and data pipelines.",
  },
  {
    icon: Globe,
    title: "Web & App Development",
    description:
      "Full-stack web applications and mobile apps built by developers who understand AI-first architecture.",
  },
  {
    icon: Cpu,
    title: "AI Integration",
    description:
      "Embed AI capabilities into your existing systems: recommendation engines, anomaly detection, forecasting.",
  },
];

export default function AiSolutions() {
  return (
    <section id="ai-solutions" className="section-pad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C04B62] text-xs font-700 tracking-widest uppercase mb-4 block">
            IT &amp; AI Solutions
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-700 text-charcoal">
            AI That Works
            <span style={{ color: "#C04B62" }}> For Your Business</span>
          </h2>
          <p className="mt-4 text-taupe text-lg max-w-2xl mx-auto">
            From custom automation to enterprise AI integrations — we build
            solutions that create measurable impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-white p-6 text-center"
              data-ocid={`ai_solutions.card.${i + 1}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#C04B62]/10 flex items-center justify-center mx-auto mb-5">
                <sol.icon className="w-7 h-7 text-[#C04B62]" />
              </div>
              <h3 className="font-700 text-charcoal mb-3">{sol.title}</h3>
              <p className="text-taupe text-sm leading-relaxed">
                {sol.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="#contact"
            data-ocid="ai_solutions.primary_button"
            className="btn-primary inline-flex"
          >
            Request a Demo
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
