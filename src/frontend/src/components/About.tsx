import { Target, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  {
    icon: Users,
    value: "50+",
    label: "Students Trained",
    desc: "Hands-on learners building real projects",
  },
  {
    icon: TrendingUp,
    value: "10+",
    label: "Business Clients",
    desc: "Enterprises trusting our BPO & IT solutions",
  },
  {
    icon: Target,
    value: "95%",
    label: "Placement Rate",
    desc: "Graduates hired within 3 months",
  },
];

export default function About() {
  return (
    <section id="about" className="section-pad section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#C04B62] text-xs font-700 tracking-widest uppercase mb-4 block">
              About Us
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-700 text-charcoal leading-tight mb-6">
              Where Education Meets
              <br />
              <em className="not-italic" style={{ color: "#C04B62" }}>
                Enterprise Excellence
              </em>
            </h2>
            <p className="text-[#C04B62] text-lg leading-relaxed mb-6">
              RiseUp Solutions is a hybrid company at the intersection of
              education and technology. We train the next generation of AI
              engineers while simultaneously delivering world-class BPO and IT
              services to businesses.
            </p>
            <p className="text-taupe leading-relaxed mb-8">
              Our unique model means our students learn on{" "}
              <em>real projects</em> — your business gets talented, motivated
              teams, and students gain the portfolio and confidence to launch
              their careers.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#programs"
                data-ocid="about.primary_button"
                className="btn-primary"
              >
                Explore Programs
              </a>
              <a
                href="#contact"
                data-ocid="about.secondary_button"
                className="btn-outline"
              >
                Partner With Us
              </a>
            </div>
          </motion.div>

          {/* Right: Stat Cards */}
          <div className="flex flex-col gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="card-white p-6 flex items-center gap-5"
                data-ocid={`about.card.${i + 1}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#C04B62]/10 flex items-center justify-center shrink-0">
                  <stat.icon className="w-7 h-7 text-[#C04B62]" />
                </div>
                <div>
                  <div className="font-display text-3xl font-700 text-charcoal">
                    {stat.value}
                  </div>
                  <div className="font-600 text-charcoal text-sm">
                    {stat.label}
                  </div>
                  <div className="text-taupe text-xs mt-0.5">{stat.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
