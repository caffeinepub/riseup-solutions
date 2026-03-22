import { Quote, Star } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
  {
    name: "Kavya Nair",
    role: "Data Analyst @ TCS",
    initials: "KN",
    stars: 5,
    quote:
      "RiseUp's bootcamp completely changed my career trajectory. Within 2 months of graduating I landed a Data Analyst role. The hands-on projects and Manish's mentoring made all the difference.",
  },
  {
    name: "Saurabh Mehta",
    role: "ML Engineer @ Startup",
    initials: "SM",
    stars: 5,
    quote:
      "I tried 3 online courses before this and none of them gave me the confidence to apply for ML roles. RiseUp's real-project approach turned me into a job-ready engineer in 45 days.",
  },
  {
    name: "Deepika Rao",
    role: "CEO, RetailTech Co.",
    initials: "DR",
    stars: 5,
    quote:
      "We hired RiseUp for our BPO needs and were blown away by the quality. Their team is responsive, accurate, and scaled with us from 10 to 10,000 records per day without missing a beat.",
  },
  {
    name: "Arjun Verma",
    role: "AI Developer @ FinTech",
    initials: "AV",
    stars: 5,
    quote:
      "The curriculum is no joke — by week 6 I was deploying real ML models. Manish is an exceptional teacher who pushes you to think like a professional engineer from day one.",
  },
];

const STAR_RATINGS = [0, 1, 2, 3, 4];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-pad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C04B62] text-xs font-700 tracking-widest uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-700 text-charcoal">
            Results That
            <span style={{ color: "#C04B62" }}> Speak for Themselves</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-white p-8 relative"
              data-ocid={`testimonials.item.${i + 1}`}
            >
              <Quote
                className="absolute top-6 right-6 w-10 h-10 text-[#F0E8E6]"
                fill="currentColor"
              />
              <div className="flex gap-1 mb-4">
                {STAR_RATINGS.slice(0, t.stars).map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 text-[#C04B62]"
                    fill="#C04B62"
                  />
                ))}
              </div>
              <p className="text-charcoal leading-relaxed mb-6 text-sm">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-700"
                  style={{
                    background: "linear-gradient(135deg, #E87272, #C04B62)",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-600 text-charcoal text-sm">{t.name}</div>
                  <div className="text-taupe text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
