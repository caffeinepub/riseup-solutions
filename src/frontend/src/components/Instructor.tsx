import { Award, Brain, Code, Users } from "lucide-react";
import { motion } from "motion/react";

const skills = [
  { icon: Code, label: "Python & ML Engineering" },
  { icon: Brain, label: "Deep Learning & NLP" },
  { icon: Award, label: "5+ Years Experience" },
  { icon: Users, label: "Mentored 50+ Students" },
];

export default function Instructor() {
  return (
    <section id="instructor" className="section-pad section-alt">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C04B62] text-xs font-700 tracking-widest uppercase mb-4 block">
            Your Instructor
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-700 text-charcoal">
            Learn from the Best
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <div
                className="w-48 h-48 rounded-3xl flex items-center justify-center text-white text-4xl font-display font-700 shadow-[0_20px_60px_rgba(192,75,98,0.3)]"
                style={{
                  background:
                    "linear-gradient(135deg, #1C1B1A 0%, #C04B62 100%)",
                }}
              >
                MKG
              </div>
              <div
                className="absolute -bottom-3 -right-3 w-12 h-12 rounded-2xl flex items-center justify-center shadow-card"
                style={{ background: "#C04B62" }}
              >
                <Brain className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="font-display text-2xl font-700 text-charcoal mt-8 mb-1">
              Manish Kumar Gangala
            </h3>
            <p className="text-[#C04B62] font-500">
              AI/ML Engineer & Lead Instructor
            </p>
            <p className="text-taupe text-sm mt-1">RiseUp Solutions</p>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#C04B62] text-lg leading-relaxed mb-6">
              Manish brings over{" "}
              <strong className="text-charcoal">
                5 years of hands-on experience
              </strong>{" "}
              in Python development, machine learning, and deploying AI
              solutions in production environments.
            </p>
            <p className="text-taupe leading-relaxed mb-8">
              After working with startups and enterprise clients alike, Manish
              founded RiseUp's training division to bridge the gap between
              textbook knowledge and real-world AI engineering. His teaching
              philosophy: every concept must be applied to a real problem the
              same day.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-white p-4 flex items-center gap-3"
                  data-ocid={`instructor.card.${i + 1}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C04B62]/10 flex items-center justify-center shrink-0">
                    <skill.icon className="w-5 h-5 text-[#C04B62]" />
                  </div>
                  <span className="text-sm font-500 text-charcoal">
                    {skill.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
