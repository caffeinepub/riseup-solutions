import { CalendarDays, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

export default function FreeDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-xl"
      data-ocid="free_demo.panel"
    >
      <div
        className="flex items-center justify-between gap-4 rounded-2xl px-5 py-3.5 shadow-[0_8px_40px_rgba(192,75,98,0.2)]"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(192,75,98,0.15)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#C04B62] flex items-center justify-center shrink-0">
            <CalendarDays className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <div className="text-xs font-700 text-[#C04B62] uppercase tracking-wide">
              Free Demo Class
            </div>
            <div className="text-sm font-500 text-charcoal">
              April 5, 2026 &middot; 11:00 AM IST
            </div>
          </div>
        </div>
        <a
          href="http://dashboard.riseupsolutions.com"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="free_demo.link"
          className="inline-flex items-center gap-1.5 btn-primary text-xs px-4 py-2.5 shrink-0"
        >
          Join Now
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}
