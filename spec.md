# RiseUp Solutions

## Current State
The site has 24 sections covering EdTech, BPO, IT/AI, testimonials, certificate verification, and contact. The admin panel (accessed via ?admin + PIN riseup2024) has two tabs: Submissions and Reviews. The backend handles certificates, contact form submissions, and a review approval workflow.

## Requested Changes (Diff)

### Add
- `Internship` type in backend with fields: id, title, description, duration, stipend, domain, applyLink, postedAt
- Backend functions: `addInternship`, `getAllInternships`, `deleteInternship`
- Public `Internships` section component showing available internship cards on the main site
- Admin "Internships" tab with a form to add new internships and list/delete existing ones
- Frontend hooks: `useGetAllInternships`, `useAddInternship`, `useDeleteInternship`

### Modify
- `AdminView.tsx`: add third tab "Internships" alongside Submissions and Reviews
- `App.tsx`: include `<Internships />` section on the public page
- `useQueries.ts` and `useMutations.ts`: add internship hooks

### Remove
- Nothing removed

## Implementation Plan
1. Update `main.mo` to add Internship type and CRUD functions
2. Create `Internships.tsx` public section component
3. Add internship hooks to `useQueries.ts` and `useMutations.ts`
4. Update `AdminView.tsx` with Internships tab (form + list with delete)
5. Update `App.tsx` to include the Internships section
