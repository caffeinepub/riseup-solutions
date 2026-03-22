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
    email: string;
    message: string;
}
export interface Certificate {
    completionDate: string;
    name: string;
    courseName: string;
    certificateCode: string;
}
export enum InquiryType {
    support = "support",
    partnership = "partnership",
    feedback = "feedback",
    general = "general"
}
export interface backendInterface {
    addCertificate(certificate: Certificate): Promise<void>;
    getAllContactFormSubmissions(): Promise<Array<ContactFormSubmission>>;
    submitContactForm(submission: ContactFormSubmission): Promise<void>;
    verifyCertificate(code: string): Promise<Certificate>;
}
