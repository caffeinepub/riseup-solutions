import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "motion/react";

const projects = [
  {
    title: "AI Customer Support Chatbot",
    student: "Priya Sharma",
    tags: ["NLP", "Python", "FastAPI"],
    description:
      "Context-aware chatbot using transformer models, deployed as a REST API with 92% intent accuracy.",
    color: "#C04B62",
  },
  {
    title: "Sales Forecasting Dashboard",
    student: "Rajan Patel",
    tags: ["ML", "Pandas", "Streamlit"],
    description:
      "Interactive dashboard predicting monthly sales with LSTM models — 94% accuracy on 3 months of real data.",
    color: "#E87272",
  },
  {
    title: "Image Classification API",
    student: "Ananya Reddy",
    tags: ["CNN", "TensorFlow", "Docker"],
    description:
      "CNN trained on custom dataset, containerized with Docker, and deployed on cloud with <200ms response.",
    color: "#1C1B1A",
  },
  {
    title: "Document Automation Tool",
    student: "Vikram Singh",
    tags: ["Automation", "Python", "PDF"],
    description:
      "Extracts, classifies, and organizes invoice data from PDFs — saving a client 40+ hours per month.",
    color: "#C04B62",
  },
  {
    title: "Stock Sentiment Analyzer",
    student: "Meera Iyer",
    tags: ["NLP", "Scrapy", "BERT"],
    description:
      "Scrapes financial news, runs sentiment analysis via fine-tuned BERT, correlates with price movements.",
    color: "#E87272",
  },
  {
    title: "E-Commerce Recommendation Engine",
    student: "Aditya Kumar",
    tags: ["ML", "Collaborative Filter", "Flask"],
    description:
      "Collaborative filtering recommendation system increasing click-through rates by 28% in A/B testing.",
    color: "#1C1B1A",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-pad section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C04B62] text-xs font-700 tracking-widest uppercase mb-4 block">
            Student Work
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-700 text-charcoal">
            Real Projects.
            <span style={{ color: "#C04B62" }}> Real Impact.</span>
          </h2>
          <p className="mt-4 text-taupe text-lg">
            Every student graduates with a portfolio of deployed, working AI
            applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-white p-6 group"
              data-ocid={`projects.item.${i + 1}`}
            >
              <div
                className="w-full h-32 rounded-xl mb-5 flex items-center justify-center text-white font-display text-lg font-600 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${proj.color} 0%, ${proj.color}99 100%)`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 70% 30%, white 0%, transparent 50%)",
                  }}
                />
                <span className="relative z-10 px-4 text-center text-sm">
                  {proj.title}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {proj.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="text-xs bg-[#F0E8E6] text-[#1C1B1A] border-0 font-500"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-taupe text-sm leading-relaxed mb-3">
                {proj.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#C04B62] font-500">
                  by {proj.student}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Github className="w-4 h-4 text-taupe hover:text-charcoal cursor-pointer" />
                  <ExternalLink className="w-4 h-4 text-taupe hover:text-charcoal cursor-pointer" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
