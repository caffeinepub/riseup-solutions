import { Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitReview } from "../hooks/useMutations";

export default function ReviewModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [courseOrProject, setCourseOrProject] = useState("");
  const [stars, setStars] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { mutateAsync, isPending } = useSubmitReview();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !stars || !comment || !role) {
      toast.error(
        "Please fill in all required fields and select a star rating.",
      );
      return;
    }
    try {
      await mutateAsync({
        name,
        role,
        courseOrProject,
        stars: BigInt(stars),
        comment,
        submittedAt: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setName("");
      setRole("");
      setCourseOrProject("");
      setStars(0);
      setComment("");
      setSubmitted(false);
    }, 300);
  };

  return (
    <>
      {/* Floating trigger */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full text-white text-sm font-600 shadow-xl"
        style={{ background: "linear-gradient(135deg, #E87272, #C04B62)" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-ocid="review.open_modal_button"
      >
        <Star className="w-4 h-4 fill-white" />
        Write a Review
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="reviewoverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) handleClose();
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              data-ocid="review.modal"
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{
                  background: "linear-gradient(135deg, #E87272, #C04B62)",
                }}
              >
                <h2 className="text-white font-700 text-lg">
                  Share Your Experience
                </h2>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-white/80 hover:text-white transition-colors"
                  data-ocid="review.close_button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div
                  className="flex flex-col items-center justify-center py-14 px-8 text-center"
                  data-ocid="review.success_state"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white text-3xl"
                    style={{
                      background: "linear-gradient(135deg, #E87272, #C04B62)",
                    }}
                  >
                    ✓
                  </div>
                  <h3 className="text-xl font-700 text-[#1C1B1A] mb-2">
                    Thank You!
                  </h3>
                  <p className="text-[#8A7E7C] text-sm">
                    Your review has been submitted for approval. Once approved,
                    it will appear in our testimonials section.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-6 px-6 py-2 rounded-xl text-white font-600 text-sm"
                    style={{
                      background: "linear-gradient(135deg, #E87272, #C04B62)",
                    }}
                    data-ocid="review.cancel_button"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="px-6 py-5 flex flex-col gap-4"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="review-name"
                      className="text-xs font-600 text-[#413F3D] mb-1 block"
                    >
                      Name <span className="text-[#C04B62]">*</span>
                    </label>
                    <input
                      id="review-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F7] border border-[#F0E8E6] text-sm text-[#1C1B1A] placeholder:text-[#8A7E7C] focus:outline-none focus:ring-2 focus:ring-[#C04B62]/30"
                      data-ocid="review.input"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label
                      htmlFor="review-role"
                      className="text-xs font-600 text-[#413F3D] mb-1 block"
                    >
                      Role <span className="text-[#C04B62]">*</span>
                    </label>
                    <select
                      id="review-role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F7] border border-[#F0E8E6] text-sm text-[#1C1B1A] focus:outline-none focus:ring-2 focus:ring-[#C04B62]/30"
                      data-ocid="review.select"
                    >
                      <option value="">Select your role</option>
                      <option value="Student">Student</option>
                      <option value="Employee">Employee</option>
                      <option value="Business Client">Business Client</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Course/Project */}
                  <div>
                    <label
                      htmlFor="review-course"
                      className="text-xs font-600 text-[#413F3D] mb-1 block"
                    >
                      Course / Project
                    </label>
                    <input
                      id="review-course"
                      type="text"
                      value={courseOrProject}
                      onChange={(e) => setCourseOrProject(e.target.value)}
                      placeholder="Which course did you take or project did you work on?"
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F7] border border-[#F0E8E6] text-sm text-[#1C1B1A] placeholder:text-[#8A7E7C] focus:outline-none focus:ring-2 focus:ring-[#C04B62]/30"
                    />
                  </div>

                  {/* Star Rating */}
                  <fieldset className="border-0 p-0 m-0">
                    <legend className="text-xs font-600 text-[#413F3D] mb-2">
                      Star Rating <span className="text-[#C04B62]">*</span>
                    </legend>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onMouseEnter={() => setHoverStar(s)}
                          onMouseLeave={() => setHoverStar(0)}
                          onClick={() => setStars(s)}
                          className="transition-transform hover:scale-110"
                          aria-label={`${s} star`}
                          data-ocid="review.toggle"
                        >
                          <Star
                            className="w-7 h-7"
                            fill={
                              (hoverStar || stars) >= s ? "#C04B62" : "none"
                            }
                            stroke={
                              (hoverStar || stars) >= s ? "#C04B62" : "#D0C8C6"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* Comment */}
                  <div>
                    <label
                      htmlFor="review-comment"
                      className="text-xs font-600 text-[#413F3D] mb-1 block"
                    >
                      Your Review <span className="text-[#C04B62]">*</span>
                    </label>
                    <textarea
                      id="review-comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                      placeholder="Share your experience with RiseUp Solutions..."
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F7] border border-[#F0E8E6] text-sm text-[#1C1B1A] placeholder:text-[#8A7E7C] focus:outline-none focus:ring-2 focus:ring-[#C04B62]/30 resize-none"
                      data-ocid="review.textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3 rounded-xl text-white font-600 text-sm transition-opacity disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg, #E87272, #C04B62)",
                    }}
                    data-ocid="review.submit_button"
                  >
                    {isPending ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
