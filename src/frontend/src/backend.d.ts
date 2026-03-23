import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactFormSubmission {
    inquiryType: InquiryType;
    name: string;
    submittedAt: string;
    email: string;
    message: string;
}
export interface Certificate {
    completionDate: string;
    name: string;
    courseName: string;
    certificateCode: string;
}
export interface ReviewInput {
    courseOrProject: string;
    name: string;
    role: string;
    submittedAt: string;
    comment: string;
    stars: bigint;
}
export interface Review {
    id: bigint;
    status: ReviewStatus;
    courseOrProject: string;
    name: string;
    role: string;
    submittedAt: string;
    comment: string;
    stars: bigint;
}
export enum InquiryType {
    support = "support",
    partnership = "partnership",
    feedback = "feedback",
    general = "general"
}
export enum ReviewStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export interface backendInterface {
    addCertificate(certificate: Certificate): Promise<void>;
    approveReview(id: bigint): Promise<void>;
    getAllContactFormSubmissions(): Promise<Array<ContactFormSubmission>>;
    getAllReviews(): Promise<Array<Review>>;
    getApprovedReviews(): Promise<Array<Review>>;
    getPendingReviews(): Promise<Array<Review>>;
    rejectReview(id: bigint): Promise<void>;
    submitContactForm(submission: ContactFormSubmission): Promise<void>;
    submitReview(review: ReviewInput): Promise<bigint>;
    verifyCertificate(code: string): Promise<Certificate>;
}
