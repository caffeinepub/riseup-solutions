# RiseUp Solutions

## Current State
- Full website with 24 sections: hero, about, programs, curriculum, instructor, pricing, BPO, AI solutions, projects, testimonials (hardcoded), certificate verification, contact, admin panel
- Backend: certificate verification, contact form submissions with timestamps, admin retrieval
- Admin panel: accessible via ?admin + PIN riseup2024, shows contact form submissions
- Testimonials: hardcoded 4 entries, names only

## Requested Changes (Diff)

### Add
- **Visitor Review Submission System**: A floating "Add a Review" button visible on the site. Clicking opens a modal form with fields: name, role (dropdown: Student, Employee, Business Client, Other), course/project they worked on (text), star rating (1-5), and review comment. Submission goes to backend as a pending review.
- **Admin Review Approval**: Admin panel gets a second tab for "Pending Reviews" showing submitted reviews with Approve/Reject buttons. Approved reviews appear in the live Testimonials section.
- **Approved Reviews in Testimonials**: Testimonials section fetches and displays approved reviews from backend alongside (or replacing) hardcoded ones.
- **Scripted Chatbot Widget**: A floating chat bubble (bottom-right) that opens a chat panel. The bot answers common questions about RiseUp Solutions (programs, pricing, bootcamp, demo class, BPO, AI solutions, contact, enrollment). Uses keyword matching to provide helpful scripted responses. Offers WhatsApp redirect for complex queries.

### Modify
- Backend: add review types and functions (submitReview, getPendingReviews, approveReview, rejectReview, getApprovedReviews)
- AdminView: add tabs for Submissions vs Reviews
- Testimonials: fetch and render approved backend reviews

### Remove
- Nothing removed

## Implementation Plan
1. Update Motoko backend with Review type, pending/approved/rejected status, and 5 new public functions
2. Add chatbot widget component (pure frontend, scripted responses, floating button)
3. Add ReviewModal component (form with name, role, course/project, stars, comment)
4. Update Testimonials to also display approved reviews from backend
5. Update AdminView to show two tabs: Contact Submissions and Pending Reviews with approve/reject
6. Add ChatBot and ReviewModal to App.tsx
