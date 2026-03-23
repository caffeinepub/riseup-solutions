import { MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  from: "user" | "bot";
  text: string;
  links?: { label: string; href: string }[];
}

function getBotResponse(input: string): {
  text: string;
  links?: { label: string; href: string }[];
} {
  const msg = input.toLowerCase();
  if (/bootcamp|program|course/.test(msg)) {
    return {
      text: "Our flagship 45-Day AI & Python Bootcamp is a hands-on, mentor-driven program capped at just 10 students per batch. You'll build real projects and get portfolio-ready. Want to know about pricing or enrollment?",
    };
  }
  if (/price|pricing|cost|fee/.test(msg)) {
    return {
      text: "The bootcamp is offered at an early-bird price — contact us for the exact fee. Reply 'enroll' to get started on WhatsApp!",
    };
  }
  if (/enroll|join|register|apply/.test(msg)) {
    return {
      text: "Ready to join? Click the link below to chat with us on WhatsApp — we'll get you enrolled!",
      links: [
        { label: "Chat on WhatsApp →", href: "https://wa.me/919700429966" },
      ],
    };
  }
  if (/demo|free class|trial/.test(msg)) {
    return {
      text: "Our next free demo class is on April 5, 2026 at 11:00 AM IST. It's completely free — join to experience the learning style before enrolling!",
    };
  }
  if (/bpo|outsource|outsourcing/.test(msg)) {
    return {
      text: "We offer premium BPO services including data entry, processing, and back-office operations. Accurate, scalable, and cost-effective. Contact us to get a quote!",
    };
  }
  if (/\bai\b|artificial intelligence|machine learning|\bml\b/.test(msg)) {
    return {
      text: "Our IT & AI Solutions help businesses automate, analyze, and grow. From AI automation to custom ML models — we build solutions tailored to your needs.",
    };
  }
  if (/contact|reach|email|phone|call/.test(msg)) {
    return {
      text: "You can reach us at riseupsolutions@zohomail.in or call +91 9988769850. WhatsApp: +91 9170042996.",
    };
  }
  if (/certificate|certification/.test(msg)) {
    return {
      text: "Upon completion, you'll receive a verified certificate from RiseUp Solutions. You can verify any certificate on our website using the certificate code.",
    };
  }
  if (/internship|intern/.test(msg)) {
    return {
      text: "We offer real internship opportunities where students work on live client projects. It's part of the bootcamp experience — hands-on from day one!",
    };
  }
  if (/hello|hi|hey|help/.test(msg)) {
    return {
      text: "Hello! I'm here to help. Ask me about our bootcamp, BPO services, AI solutions, pricing, or how to enroll!",
    };
  }
  return {
    text: "That's a great question! For detailed information, please reach out to us directly:",
    links: [
      { label: "Chat on WhatsApp →", href: "https://wa.me/919700429966" },
      { label: "Email us →", href: "mailto:riseupsolutions@zohomail.in" },
    ],
  };
}

let idCounter = 0;

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: ++idCounter,
      from: "bot",
      text: "Hi! I'm the RiseUp Assistant. Ask me anything about our programs, pricing, or how to get started!",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(
        () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
        50,
      );
    }
  }, [open]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: ++idCounter, from: "user", text: trimmed };
    const response = getBotResponse(trimmed);
    const botMsg: Message = {
      id: ++idCounter,
      from: "bot",
      text: response.text,
      links: response.links,
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
    setTimeout(
      () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatpanel"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-[340px] rounded-2xl overflow-hidden shadow-2xl border border-[#F0E8E6] flex flex-col"
            style={{ height: 480 }}
            data-ocid="chatbot.panel"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{
                background: "linear-gradient(135deg, #E87272, #C04B62)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-700 text-sm">
                  R
                </div>
                <div>
                  <div className="text-white font-700 text-sm">
                    RiseUp AI Assistant
                  </div>
                  <div className="text-white/70 text-xs">
                    Typically replies instantly
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                data-ocid="chatbot.close_button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-[#FAF9F7]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {msg.from === "bot" && (
                    <div
                      className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-700 mt-0.5"
                      style={{
                        background: "linear-gradient(135deg, #E87272, #C04B62)",
                      }}
                    >
                      R
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                      msg.from === "user"
                        ? "text-white rounded-tr-sm"
                        : "bg-white text-[#1C1B1A] rounded-tl-sm shadow-sm border border-[#F0E8E6]"
                    }`}
                    style={
                      msg.from === "user"
                        ? {
                            background:
                              "linear-gradient(135deg, #E87272, #C04B62)",
                          }
                        : {}
                    }
                  >
                    {msg.text}
                    {msg.links && msg.links.length > 0 && (
                      <div className="flex flex-col gap-1 mt-2">
                        {msg.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-[#C04B62] font-600 underline hover:text-[#E87272] transition-colors"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="bg-white border-t border-[#F0E8E6] px-3 py-2 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a message..."
                className="flex-1 bg-[#FAF9F7] rounded-xl px-3 py-2 text-xs text-[#1C1B1A] placeholder:text-[#8A7E7C] focus:outline-none focus:ring-2 focus:ring-[#C04B62]/30"
                data-ocid="chatbot.input"
              />
              <button
                type="button"
                onClick={sendMessage}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white transition-opacity hover:opacity-80"
                style={{
                  background: "linear-gradient(135deg, #E87272, #C04B62)",
                }}
                data-ocid="chatbot.submit_button"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white relative"
        style={{ background: "linear-gradient(135deg, #E87272, #C04B62)" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        data-ocid="chatbot.open_modal_button"
        aria-label="Open chat"
      >
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-30"
          style={{ background: "linear-gradient(135deg, #E87272, #C04B62)" }}
        />
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
}
