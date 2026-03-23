import {
  CheckCircle,
  Clock,
  Mail,
  MessageSquare,
  RefreshCw,
  Star,
  Tag,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useApproveReview, useRejectReview } from "../hooks/useMutations";
import {
  useGetAllContactFormSubmissions,
  useGetPendingReviews,
} from "../hooks/useQueries";

const ADMIN_PIN = "riseup2024";

type Tab = "submissions" | "reviews";

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }, (_, i) => i).map((i) => (
        <Star key={i + 1} className="w-4 h-4 text-[#C04B62]" fill="#C04B62" />
      ))}
    </div>
  );
}

export default function AdminView() {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("submissions");

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

  const { mutateAsync: approveReview } = useApproveReview();
  const { mutateAsync: rejectReview } = useRejectReview();

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Incorrect PIN. Please try again.");
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
          }}
          className="flex items-center gap-2 text-[#8A7E7C] hover:text-white transition-colors text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("submissions")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-600 text-sm transition-all ${
              activeTab === "submissions"
                ? "text-white shadow-md"
                : "bg-white text-[#8A7E7C] hover:text-[#1C1B1A]"
            }`}
            style={
              activeTab === "submissions"
                ? { background: "linear-gradient(135deg, #E87272, #C04B62)" }
                : {}
            }
            data-ocid="admin.submissions.tab"
          >
            <MessageSquare className="w-4 h-4" />
            Submissions
            {submissions && (
              <span
                className={`text-xs font-700 px-2 py-0.5 rounded-full ${
                  activeTab === "submissions"
                    ? "bg-white/20 text-white"
                    : "bg-[#C04B62]/10 text-[#C04B62]"
                }`}
              >
                {submissions.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-600 text-sm transition-all ${
              activeTab === "reviews"
                ? "text-white shadow-md"
                : "bg-white text-[#8A7E7C] hover:text-[#1C1B1A]"
            }`}
            style={
              activeTab === "reviews"
                ? { background: "linear-gradient(135deg, #E87272, #C04B62)" }
                : {}
            }
            data-ocid="admin.reviews.tab"
          >
            <Star className="w-4 h-4" />
            Reviews
            {pendingReviews && pendingReviews.length > 0 && (
              <span
                className={`text-xs font-700 px-2 py-0.5 rounded-full ${
                  activeTab === "reviews"
                    ? "bg-white/20 text-white"
                    : "bg-[#C04B62]/10 text-[#C04B62]"
                }`}
              >
                {pendingReviews.length}
              </span>
            )}
          </button>
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
      </div>
    </div>
  );
}
