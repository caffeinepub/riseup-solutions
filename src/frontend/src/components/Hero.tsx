import { ArrowRight, Sparkles, Star, Users } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        background:
          "linear-gradient(135deg, #FAF9F7 0%, #FCEEE8 25%, #F9E0D8 50%, #FAF9F7 75%, #FDF4F0 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 14s ease infinite",
      }}
    >
      {/* Floating orbs */}
      <div
        className="absolute top-1/4 left-[8%] w-72 h-72 rounded-full opacity-25 animate-float-up"
        style={{
          background: "radial-gradient(circle, #C04B62 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-[8%] w-96 h-96 rounded-full opacity-20 animate-float-side"
        style={{
          background: "radial-gradient(circle, #E87272 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #C04B62 0%, transparent 60%)",
          filter: "blur(120px)",
        }}
      />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#1C1B1A 1px, transparent 1px), linear-gradient(90deg, #1C1B1A 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="badge-limited">
            <Sparkles className="w-3.5 h-3.5" />
            Limited: Only 10 seats per batch
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-700 text-charcoal leading-[1.1] tracking-tight mb-6"
        >
          Transform Your Career
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #E87272 0%, #C04B62 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            with AI &amp; Python
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-[#C04B62] max-w-3xl mx-auto leading-relaxed mb-10"
        >
          Master AI &amp; Python in our intensive{" "}
          <strong className="text-charcoal">45-day bootcamp</strong> — or let
          our expert team handle your{" "}
          <strong className="text-charcoal">BPO operations</strong> and deliver
          cutting-edge{" "}
          <strong className="text-charcoal">IT &amp; AI solutions</strong> for
          your business.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#pricing"
            data-ocid="hero.primary_button"
            className="btn-primary text-base px-8 py-3.5 group"
          >
            Join the Bootcamp
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            data-ocid="hero.secondary_button"
            className="btn-outline text-base px-8 py-3.5"
          >
            Get a Quote
          </a>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-taupe"
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#C04B62]" />
            <span>50+ Students Trained</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-taupe hidden sm:block" />
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#C04B62]" />
            <span>95% Placement Rate</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-taupe hidden sm:block" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C04B62]" />
            <span>Mentor-Driven Learning</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
