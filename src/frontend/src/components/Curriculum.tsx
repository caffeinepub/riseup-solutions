import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const weeks = [
  {
    period: "Week 1–2",
    title: "Python Fundamentals & Data Structures",
    topics: [
      "Python syntax, variables, operators",
      "Control flow: if/else, loops, comprehensions",
      "Functions, modules, and packages",
      "Lists, dicts, sets, and tuples",
      "OOP: classes, inheritance, magic methods",
    ],
  },
  {
    period: "Week 3–4",
    title: "Data Analysis with Pandas & NumPy",
    topics: [
      "NumPy arrays and vectorized operations",
      "Pandas DataFrames: load, clean, transform",
      "Exploratory data analysis (EDA)",
      "Data visualization with Matplotlib & Seaborn",
      "Mini-project: Real dataset analysis report",
    ],
  },
  {
    period: "Week 5–6",
    title: "Machine Learning with Scikit-Learn",
    topics: [
      "Supervised learning: regression & classification",
      "Decision trees, random forests, SVMs",
      "Model evaluation: cross-validation, metrics",
      "Feature engineering and pipelines",
      "Project: Predictive model deployment",
    ],
  },
  {
    period: "Week 7",
    title: "Deep Learning & Neural Networks",
    topics: [
      "Intro to neural networks and backpropagation",
      "TensorFlow / Keras fundamentals",
      "CNNs for image classification",
      "Transfer learning techniques",
      "Hands-on: Build your first neural network",
    ],
  },
  {
    period: "Week 8–9",
    title: "Real-World AI Projects & Portfolio",
    topics: [
      "End-to-end project: AI Chatbot with NLP",
      "Data dashboard with Streamlit",
      "ML model as REST API (FastAPI)",
      "Automation scripts with Python",
      "GitHub portfolio & project documentation",
    ],
  },
  {
    period: "Week 10",
    title: "Interview Prep, Job Readiness & Certificate",
    topics: [
      "Resume and LinkedIn optimization",
      "Technical interview mock sessions",
      "Coding challenges (LeetCode-style)",
      "Salary negotiation & career strategy",
      "Certificate issuance & career readiness",
    ],
  },
];

export default function Curriculum() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="curriculum" className="section-pad">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C04B62] text-xs font-700 tracking-widest uppercase mb-4 block">
            Curriculum
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-700 text-charcoal">
            45 Days. <span style={{ color: "#C04B62" }}>Zero Fluff.</span>
          </h2>
          <p className="mt-4 text-taupe text-lg">
            Every week is structured to build on the last — from fundamentals to
            full deployment.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {weeks.map((week, i) => (
            <motion.div
              key={week.period}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="card-white overflow-hidden"
              data-ocid={`curriculum.item.${i + 1}`}
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                data-ocid={`curriculum.toggle.${i + 1}`}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#FDF4F0] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-800 text-white shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #E87272, #C04B62)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <div className="text-xs font-700 text-[#C04B62] uppercase tracking-wide mb-0.5">
                      {week.period}
                    </div>
                    <div className="font-600 text-charcoal">{week.title}</div>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-taupe transition-transform shrink-0 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6 border-t border-[#F0E8E6]"
                >
                  <ul className="pt-4 grid sm:grid-cols-2 gap-2">
                    {week.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-start gap-2 text-sm text-[#C04B62]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C04B62] mt-1.5 shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
