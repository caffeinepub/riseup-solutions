import { Quote, Star } from "lucide-react";
import { motion } from "motion/react";
import { useGetApprovedReviews } from "../hooks/useQueries";

const testimonials = [
  {
    name: "Kavya Nair",
    initials: "KN",
    stars: 5,
    quote:
      "RiseUp's bootcamp completely changed my career trajectory. Within 2 months of graduating I landed a Data Analyst role. The hands-on projects and Manish's mentoring made all the difference.",
  },
  {
    name: "Saurabh Mehta",
    initials: "SM",
    stars: 5,
    quote:
      "I tried 3 online courses before this and none of them gave me the confidence to apply for ML roles. RiseUp's real-project approach turned me into a job-ready engineer in 45 days.",
  },
  {
    name: "Deepika Rao",
    initials: "DR",
    stars: 5,
    quote:
      "We hired RiseUp for our BPO needs and were blown away by the quality. Their team is responsive, accurate, and scaled with us from 10 to 10,000 records per day without missing a beat.",
  },
  {
    name: "Arjun Verma",
    initials: "AV",
    stars: 5,
    quote:
      "The curriculum is no joke — by week 6 I was deploying real ML models. Manish is an exceptional teacher who pushes you to think like a professional engineer from day one.",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }, (_, i) => i).map((i) => (
        <Star key={i + 1} className="w-4 h-4 text-[#C04B62]" fill="#C04B62" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { data: approvedReviews } = useGetApprovedReviews();

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
              <StarRow count={t.stars} />
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
                </div>
              </div>
            </motion.div>
          ))}

          {approvedReviews?.map((review, i) => {
            const starCount = Number(review.stars);
            const initials = review.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);
            return (
              <motion.div
                key={String(review.id)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (testimonials.length + i) * 0.1 }}
                className="card-white p-8 relative"
                data-ocid={`testimonials.item.${testimonials.length + i + 1}`}
              >
                <Quote
                  className="absolute top-6 right-6 w-10 h-10 text-[#F0E8E6]"
                  fill="currentColor"
                />
                <StarRow count={starCount} />
                <p className="text-charcoal leading-relaxed mb-6 text-sm">
                  "{review.comment}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-700"
                    style={{
                      background: "linear-gradient(135deg, #E87272, #C04B62)",
                    }}
                  >
                    {initials}
                  </div>
                  <div>
                    <div className="font-600 text-charcoal text-sm">
                      {review.name}
                    </div>
                    {review.courseOrProject && (
                      <div className="text-xs text-[#8A7E7C]">
                        {review.courseOrProject}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
