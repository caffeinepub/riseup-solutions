import { CheckCircle, Loader2, Search, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Certificate } from "../backend";
import { useVerifyCertificate } from "../hooks/useQueries";

export default function CertificateVerification() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<Certificate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { mutate, isPending } = useVerifyCertificate();

  const handleVerify = () => {
    if (!code.trim()) return;
    setResult(null);
    setError(null);
    mutate(code.trim(), {
      onSuccess: (cert) => setResult(cert),
      onError: () =>
        setError("Certificate not found. Please check the code and try again."),
    });
  };

  return (
    <section id="verify" className="section-pad section-alt">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C04B62] text-xs font-700 tracking-widest uppercase mb-4 block">
            Verification
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-700 text-charcoal">
            Verify a<span style={{ color: "#C04B62" }}> Certificate</span>
          </h2>
          <p className="mt-4 text-taupe">
            Enter a certificate code to verify authenticity.
            <br />
            <span className="text-[#C04B62] font-500">Try: RISEUP-2024</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-white p-8"
        >
          <div className="flex gap-3">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              placeholder="Enter certificate code (e.g. RISEUP-2024)"
              data-ocid="verify.input"
              aria-label="Certificate code"
              className="flex-1 px-4 py-3 rounded-xl border border-[#F0E8E6] bg-[#FAF9F7] text-charcoal placeholder:text-taupe focus:outline-none focus:ring-2 focus:ring-[#C04B62]/30 focus:border-[#C04B62] transition-all text-sm"
            />
            <button
              type="button"
              onClick={handleVerify}
              disabled={isPending || !code.trim()}
              data-ocid="verify.submit_button"
              aria-label="Verify certificate"
              className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="mt-6 p-6 rounded-2xl border-2 border-green-400 bg-green-50 animate-glow-green"
                data-ocid="verify.success_state"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="font-700 text-green-700">
                    Certificate Verified!
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-taupe text-xs uppercase tracking-wide mb-1">
                      Student Name
                    </div>
                    <div className="font-600 text-charcoal">{result.name}</div>
                  </div>
                  <div>
                    <div className="text-taupe text-xs uppercase tracking-wide mb-1">
                      Course
                    </div>
                    <div className="font-600 text-charcoal">
                      {result.courseName}
                    </div>
                  </div>
                  <div>
                    <div className="text-taupe text-xs uppercase tracking-wide mb-1">
                      Completion Date
                    </div>
                    <div className="font-600 text-charcoal">
                      {result.completionDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-taupe text-xs uppercase tracking-wide mb-1">
                      Certificate Code
                    </div>
                    <div className="font-600 text-charcoal font-mono text-xs">
                      {result.certificateCode}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="mt-6 p-5 rounded-2xl border-2 border-red-300 bg-red-50 animate-glow-red"
                data-ocid="verify.error_state"
              >
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
