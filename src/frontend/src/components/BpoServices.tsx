import {
  ArrowRight,
  Database,
  Headphones,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: Database,
    title: "Data Entry & Processing",
    description:
      "High-accuracy, high-volume data entry, cleansing, and validation services with guaranteed turnaround times.",
  },
  {
    icon: Headphones,
    title: "Customer Support Outsourcing",
    description:
      "Dedicated support teams trained on your product — email, chat, and voice support that feels in-house.",
  },
  {
    icon: Settings,
    title: "Back-Office Operations",
    description:
      "Invoicing, HR support, order processing, and administrative tasks so your team focuses on growth.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "Systematic QA processes to ensure every deliverable meets your standards before reaching customers.",
  },
];

export default function BpoServices() {
  return (
    <section id="bpo" className="section-pad section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#697184] text-xs font-700 tracking-widest uppercase mb-4 block">
              BPO Services
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-700 text-charcoal leading-tight mb-6">
              Scale Operations.
              <br />
              <span style={{ color: "#697184" }}>Cut Costs. Grow.</span>
            </h2>
            <p className="text-[#697184] text-lg leading-relaxed mb-8">
              Hand off the repetitive work. Our trained BPO teams handle data
              processing, customer support, and back-office operations — freeing
              your core team to focus on what matters.
            </p>
            <a
              href="#contact"
              data-ocid="bpo.primary_button"
              className="btn-primary"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-white p-6"
                data-ocid={`bpo.card.${i + 1}`}
              >
                <div className="w-11 h-11 rounded-xl bg-[#697184]/10 flex items-center justify-center mb-4">
                  <svc.icon className="w-5 h-5 text-[#697184]" />
                </div>
                <h3 className="font-600 text-charcoal text-sm mb-2">
                  {svc.title}
                </h3>
                <p className="text-taupe text-xs leading-relaxed">
                  {svc.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
