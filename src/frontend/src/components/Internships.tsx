import {
  ArrowRight,
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
} from "lucide-react";
import { motion } from "motion/react";
import { useGetAllInternships } from "../hooks/useQueries";

export default function Internships() {
  const { data: internships, isLoading } = useGetAllInternships();

  if (isLoading) return null;
  if (!internships || internships.length === 0) {
    return (
      <section
        id="internships"
        className="py-20 bg-[#1C1B1A] relative overflow-hidden"
      >
        {/* Gradient accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E87272] to-[#C04B62]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-700 tracking-widest uppercase text-[#E87272] mb-4">
              Internships
            </span>
            <h2 className="text-3xl sm:text-4xl font-800 text-white mb-4">
              Internship{" "}
              <span className="bg-gradient-to-r from-[#E87272] to-[#C04B62] bg-clip-text text-transparent">
                Opportunities
              </span>
            </h2>
            <p className="text-[#8A7E7C] max-w-xl mx-auto mb-12">
              Gain real-world experience working on live projects with our team
              of mentors and industry professionals.
            </p>
            <div
              className="bg-[#2A2928] rounded-2xl p-12 border border-[#3A3836] inline-block"
              data-ocid="internships.empty_state"
            >
              <Briefcase className="w-14 h-14 text-[#C04B62] mx-auto mb-4 opacity-60" />
              <p className="text-[#8A7E7C] text-lg">
                No open positions right now.
              </p>
              <p className="text-[#6A5E5C] text-sm mt-2">
                Check back soon — new internships are added regularly.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="internships"
      className="py-20 bg-[#1C1B1A] relative overflow-hidden"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E87272] to-[#C04B62]" />

      {/* Glow orbs */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#C04B62] opacity-5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-[#E87272] opacity-5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-700 tracking-widest uppercase text-[#E87272] mb-4">
            Internships
          </span>
          <h2 className="text-3xl sm:text-4xl font-800 text-white mb-4">
            Internship{" "}
            <span className="bg-gradient-to-r from-[#E87272] to-[#C04B62] bg-clip-text text-transparent">
              Opportunities
            </span>
          </h2>
          <p className="text-[#8A7E7C] max-w-2xl mx-auto text-base sm:text-lg">
            Step beyond the classroom. Work on real projects, build your
            portfolio, and gain hands-on industry experience with RiseUp
            Solutions.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {internships.map((internship, idx) => (
            <motion.div
              key={String(internship.id)}
              className="group relative bg-[#232221] border border-[#3A3836] rounded-2xl p-6 flex flex-col hover:border-[#C04B62]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(192,75,98,0.15)]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              data-ocid={`internships.item.${idx + 1}`}
            >
              {/* Domain badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-700 px-3 py-1 rounded-full text-white"
                  style={{
                    background: "linear-gradient(135deg, #E87272, #C04B62)",
                  }}
                >
                  {internship.domain}
                </span>
                <Briefcase className="w-5 h-5 text-[#C04B62] opacity-60" />
              </div>

              {/* Title */}
              <h3 className="text-white font-700 text-lg mb-3 group-hover:text-[#E87272] transition-colors">
                {internship.title}
              </h3>

              {/* Description */}
              <p className="text-[#8A7E7C] text-sm leading-relaxed mb-5 flex-1">
                {internship.description}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap gap-3 mb-5 text-xs text-[#6A5E5C]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#C04B62]" />
                  {internship.duration}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-[#C04B62]" />
                  {internship.stipend}
                </span>
                {internship.postedAt && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C04B62]" />
                    {internship.postedAt}
                  </span>
                )}
              </div>

              {/* CTA */}
              <a
                href={internship.applyLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white text-sm font-600 transition-all duration-300 hover:shadow-[0_0_20px_rgba(232,114,114,0.4)] hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #E87272, #C04B62)",
                }}
                data-ocid={`internships.button.${idx + 1}`}
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
