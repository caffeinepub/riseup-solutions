import {
  Briefcase,
  CheckCircle,
  Clock,
  Loader2,
  Mail,
  MessageSquare,
  RefreshCw,
  Star,
  Tag,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import {
  useAddInternship,
  useApproveReview,
  useDeleteInternship,
  useRejectReview,
} from "../hooks/useMutations";
import {
  useGetAllContactFormSubmissions,
  useGetAllInternships,
  useGetPendingReviews,
} from "../hooks/useQueries";

const ADMIN_PIN = "riseup2024";

type Tab = "submissions" | "reviews" | "internships";

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }, (_, i) => i).map((i) => (
        <Star key={i + 1} className="w-4 h-4 text-[#C04B62]" fill="#C04B62" />
      ))}
    </div>
  );
}

const DOMAIN_OPTIONS = [
  "AI/ML",
  "Web Development",
  "Data Science",
  "BPO",
  "UI/UX Design",
  "Python",
  "Other",
];

function getISTDateTime() {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function AdminView() {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("submissions");

  // Internship form state
  const [internForm, setInternForm] = useState({
    title: "",
    domain: "AI/ML",
    duration: "",
    stipend: "",
    description: "",
    applyLink: "",
  });
  const [internFormError, setInternFormError] = useState("");

  const {
    data: submissions,
    isLoading: subsLoading,
    refetch: refetchSubs,
  } = useGetAllContactFormSubmissions();

  const {
    data: pendingReviews,
    isLoading: reviewsLoading,
    refetch: refetchReviews,
  } = useGetPendingReviews();

  const {
    data: internships,
    isLoading: internshipsLoading,
    refetch: refetchInternships,
  } = useGetAllInternships();

  const { mutateAsync: approveReview } = useApproveReview();
  const { mutateAsync: rejectReview } = useRejectReview();
  const { mutateAsync: addInternship, isPending: addingInternship } =
    useAddInternship();
  const { mutateAsync: deleteInternship } = useDeleteInternship();

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Incorrect PIN. Please try again.");
    }
  };

  const handleAddInternship = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !internForm.title ||
      !internForm.duration ||
      !internForm.stipend ||
      !internForm.description
    ) {
      setInternFormError("Please fill in all required fields.");
      return;
    }
    setInternFormError("");
    try {
      await addInternship({
        title: internForm.title,
        domain: internForm.domain,
        duration: internForm.duration,
        stipend: internForm.stipend,
        description: internForm.description,
        applyLink: internForm.applyLink,
        postedAt: getISTDateTime(),
      });
      setInternForm({
        title: "",
        domain: "AI/ML",
        duration: "",
        stipend: "",
        description: "",
        applyLink: "",
      });
    } catch {
      setInternFormError("Failed to add internship. Please try again.");
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#1C1B1A] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <img
              src="/assets/uploads/image-2-1.png"
              alt="RiseUp Solutions"
              className="h-10 w-auto object-contain brightness-0 invert mx-auto mb-6"
            />
            <h1 className="text-white text-2xl font-700 mb-2">Admin Access</h1>
            <p className="text-[#8A7E7C] text-sm">
              Enter your PIN to view form submissions
            </p>
          </div>
          <form onSubmit={handleUnlock} className="flex flex-col gap-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              className="w-full px-4 py-3 rounded-xl bg-[#2A2928] border border-[#3A3836] text-white placeholder:text-[#8A7E7C] focus:outline-none focus:border-[#C04B62] text-center text-lg tracking-widest"
            />
            {error && (
              <p className="text-[#E87272] text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#C04B62] text-white font-600 hover:bg-[#E87272] transition-colors"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      <div className="bg-[#1C1B1A] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/assets/uploads/image-2-1.png"
            alt="RiseUp Solutions"
            className="h-8 w-auto object-contain brightness-0 invert"
          />
          <span className="text-white font-600 text-sm">Admin Panel</span>
        </div>
        <button
          type="button"
          onClick={() => {
            refetchSubs();
            refetchReviews();
            refetchInternships();
          }}
          className="flex items-center gap-2 text-[#8A7E7C] hover:text-white transition-colors text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(
            [
              {
                key: "submissions",
                label: "Submissions",
                icon: MessageSquare,
                count: submissions?.length,
              },
              {
                key: "reviews",
                label: "Reviews",
                icon: Star,
                count: pendingReviews?.length,
              },
              {
                key: "internships",
                label: "Internships",
                icon: Briefcase,
                count: internships?.length,
              },
            ] as const
          ).map(({ key, label, icon: Icon, count }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-600 text-sm transition-all ${
                activeTab === key
                  ? "text-white shadow-md"
                  : "bg-white text-[#8A7E7C] hover:text-[#1C1B1A]"
              }`}
              style={
                activeTab === key
                  ? { background: "linear-gradient(135deg, #E87272, #C04B62)" }
                  : {}
              }
              data-ocid={`admin.${key}.tab`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {count !== undefined && count > 0 && (
                <span
                  className={`text-xs font-700 px-2 py-0.5 rounded-full ${
                    activeTab === key
                      ? "bg-white/20 text-white"
                      : "bg-[#C04B62]/10 text-[#C04B62]"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Submissions Tab */}
        {activeTab === "submissions" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-700 text-[#1C1B1A]">
                Contact Form Submissions
              </h2>
              {submissions && (
                <span className="bg-[#C04B62] text-white text-xs font-700 px-3 py-1 rounded-full">
                  {submissions.length} total
                </span>
              )}
            </div>

            {subsLoading && (
              <div
                className="text-center py-20 text-[#8A7E7C]"
                data-ocid="admin.loading_state"
              >
                Loading submissions...
              </div>
            )}

            {!subsLoading && submissions?.length === 0 && (
              <div
                className="text-center py-20 text-[#8A7E7C]"
                data-ocid="admin.empty_state"
              >
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>No submissions yet.</p>
              </div>
            )}

            <div className="flex flex-col gap-4 pb-10">
              {submissions?.map((sub, idx) => (
                <div
                  key={`${sub.email}-${idx}`}
                  className="bg-white rounded-2xl p-6 border border-[#F0E8E6] shadow-sm"
                  data-ocid={`admin.submissions.item.${idx + 1}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#C04B62]/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-[#C04B62]" />
                      </div>
                      <div>
                        <div className="font-700 text-[#1C1B1A]">
                          {sub.name}
                        </div>
                        <div className="text-xs text-[#8A7E7C] flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {sub.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="inline-flex items-center gap-1.5 text-xs font-600 bg-[#C04B62]/10 text-[#C04B62] px-3 py-1 rounded-full">
                        <Tag className="w-3 h-3" />
                        {sub.inquiryType}
                      </span>
                      {sub.submittedAt && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#8A7E7C]">
                          <Clock className="w-3 h-3" />
                          {sub.submittedAt}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#413F3D] leading-relaxed bg-[#FAF9F7] rounded-xl p-4">
                    {sub.message}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-700 text-[#1C1B1A]">
                Pending Reviews
              </h2>
              {pendingReviews && (
                <span className="bg-[#C04B62] text-white text-xs font-700 px-3 py-1 rounded-full">
                  {pendingReviews.length} pending
                </span>
              )}
            </div>

            {reviewsLoading && (
              <div
                className="text-center py-20 text-[#8A7E7C]"
                data-ocid="admin.reviews.loading_state"
              >
                Loading reviews...
              </div>
            )}

            {!reviewsLoading && pendingReviews?.length === 0 && (
              <div
                className="text-center py-20 text-[#8A7E7C]"
                data-ocid="admin.reviews.empty_state"
              >
                <Star className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>No pending reviews.</p>
              </div>
            )}

            <div className="flex flex-col gap-4 pb-10">
              {pendingReviews?.map((review, idx) => (
                <div
                  key={String(review.id)}
                  className="bg-white rounded-2xl p-6 border border-[#F0E8E6] shadow-sm"
                  data-ocid={`admin.reviews.item.${idx + 1}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="font-700 text-[#1C1B1A]">
                        {review.name}
                      </div>
                      <div className="text-xs text-[#8A7E7C]">
                        {review.role}
                      </div>
                      {review.courseOrProject && (
                        <div className="text-xs text-[#8A7E7C]">
                          {review.courseOrProject}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <StarRow count={Number(review.stars)} />
                      {review.submittedAt && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#8A7E7C]">
                          <Clock className="w-3 h-3" />
                          {review.submittedAt}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#413F3D] leading-relaxed bg-[#FAF9F7] rounded-xl p-4 mb-4">
                    {review.comment}
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => approveReview(review.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white text-sm font-600 hover:bg-green-600 transition-colors"
                      data-ocid={`admin.reviews.confirm_button.${idx + 1}`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => rejectReview(review.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-600 hover:bg-red-600 transition-colors"
                      data-ocid={`admin.reviews.delete_button.${idx + 1}`}
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Internships Tab */}
        {activeTab === "internships" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-700 text-[#1C1B1A]">
                Manage Internships
              </h2>
              {internships && (
                <span className="bg-[#C04B62] text-white text-xs font-700 px-3 py-1 rounded-full">
                  {internships.length} posted
                </span>
              )}
            </div>

            {/* Add Internship Form */}
            <div className="bg-white rounded-2xl p-6 border border-[#F0E8E6] shadow-sm mb-8">
              <h3 className="text-lg font-700 text-[#1C1B1A] mb-5 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#C04B62]" />
                Post New Internship
              </h3>
              <form
                onSubmit={handleAddInternship}
                className="grid sm:grid-cols-2 gap-4"
              >
                <div>
                  <label
                    htmlFor="intern-title"
                    className="block text-xs font-600 text-[#413F3D] mb-1.5"
                  >
                    Title *
                  </label>
                  <input
                    id="intern-title"
                    type="text"
                    value={internForm.title}
                    onChange={(e) =>
                      setInternForm((p) => ({ ...p, title: e.target.value }))
                    }
                    placeholder="e.g. AI/ML Research Intern"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F7] border border-[#E8E0DE] text-[#1C1B1A] placeholder:text-[#B0A9A7] focus:outline-none focus:border-[#C04B62] text-sm"
                    data-ocid="admin.internships.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="intern-domain"
                    className="block text-xs font-600 text-[#413F3D] mb-1.5"
                  >
                    Domain *
                  </label>
                  <select
                    id="intern-domain"
                    value={internForm.domain}
                    onChange={(e) =>
                      setInternForm((p) => ({ ...p, domain: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F7] border border-[#E8E0DE] text-[#1C1B1A] focus:outline-none focus:border-[#C04B62] text-sm"
                    data-ocid="admin.internships.select"
                  >
                    {DOMAIN_OPTIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="intern-duration"
                    className="block text-xs font-600 text-[#413F3D] mb-1.5"
                  >
                    Duration *
                  </label>
                  <input
                    id="intern-duration"
                    type="text"
                    value={internForm.duration}
                    onChange={(e) =>
                      setInternForm((p) => ({ ...p, duration: e.target.value }))
                    }
                    placeholder="e.g. 2 months"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F7] border border-[#E8E0DE] text-[#1C1B1A] placeholder:text-[#B0A9A7] focus:outline-none focus:border-[#C04B62] text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="intern-stipend"
                    className="block text-xs font-600 text-[#413F3D] mb-1.5"
                  >
                    Stipend *
                  </label>
                  <input
                    id="intern-stipend"
                    type="text"
                    value={internForm.stipend}
                    onChange={(e) =>
                      setInternForm((p) => ({ ...p, stipend: e.target.value }))
                    }
                    placeholder="e.g. ₹5000/month or Unpaid"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F7] border border-[#E8E0DE] text-[#1C1B1A] placeholder:text-[#B0A9A7] focus:outline-none focus:border-[#C04B62] text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="intern-description"
                    className="block text-xs font-600 text-[#413F3D] mb-1.5"
                  >
                    Description *
                  </label>
                  <textarea
                    id="intern-description"
                    value={internForm.description}
                    onChange={(e) =>
                      setInternForm((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Describe the internship role, responsibilities, and requirements..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F7] border border-[#E8E0DE] text-[#1C1B1A] placeholder:text-[#B0A9A7] focus:outline-none focus:border-[#C04B62] text-sm resize-none"
                    data-ocid="admin.internships.textarea"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="intern-applylink"
                    className="block text-xs font-600 text-[#413F3D] mb-1.5"
                  >
                    Apply Link (optional)
                  </label>
                  <input
                    id="intern-applylink"
                    type="url"
                    value={internForm.applyLink}
                    onChange={(e) =>
                      setInternForm((p) => ({
                        ...p,
                        applyLink: e.target.value,
                      }))
                    }
                    placeholder="https://forms.google.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F7] border border-[#E8E0DE] text-[#1C1B1A] placeholder:text-[#B0A9A7] focus:outline-none focus:border-[#C04B62] text-sm"
                  />
                </div>

                {internFormError && (
                  <div
                    className="sm:col-span-2 text-[#E87272] text-sm"
                    data-ocid="admin.internships.error_state"
                  >
                    {internFormError}
                  </div>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={addingInternship}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-600 text-sm transition-all hover:shadow-md disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg, #E87272, #C04B62)",
                    }}
                    data-ocid="admin.internships.submit_button"
                  >
                    {addingInternship ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Adding...
                      </>
                    ) : (
                      <>
                        <Briefcase className="w-4 h-4" /> Add Internship
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Current Internships List */}
            {internshipsLoading && (
              <div
                className="text-center py-20 text-[#8A7E7C]"
                data-ocid="admin.internships.loading_state"
              >
                Loading internships...
              </div>
            )}

            {!internshipsLoading && internships?.length === 0 && (
              <div
                className="text-center py-16 text-[#8A7E7C]"
                data-ocid="admin.internships.empty_state"
              >
                <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>No internships posted yet.</p>
                <p className="text-sm mt-1">
                  Use the form above to add your first internship.
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3 pb-10">
              {internships?.map((intern, idx) => (
                <div
                  key={String(intern.id)}
                  className="bg-white rounded-2xl p-5 border border-[#F0E8E6] shadow-sm flex flex-wrap items-center justify-between gap-4"
                  data-ocid={`admin.internships.item.${idx + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-700 text-[#1C1B1A] truncate">
                        {intern.title}
                      </span>
                      <span
                        className="text-xs font-600 px-2.5 py-0.5 rounded-full text-white shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, #E87272, #C04B62)",
                        }}
                      >
                        {intern.domain}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-[#8A7E7C]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {intern.duration}
                      </span>
                      <span>{intern.stipend}</span>
                      {intern.postedAt && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {intern.postedAt}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteInternship(intern.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-500 text-sm font-600 hover:bg-red-500 hover:text-white transition-colors shrink-0"
                    data-ocid={`admin.internships.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
