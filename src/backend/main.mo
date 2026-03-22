import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";

actor {
  type Certificate = {
    name : Text;
    courseName : Text;
    completionDate : Text;
    certificateCode : Text;
  };

  module Certificate {
    public func compare(c1 : Certificate, c2 : Certificate) : Order.Order {
      Text.compare(c1.certificateCode, c2.certificateCode);
    };
  };

  let certificates = Map.empty<Text, Certificate>();

  public type InquiryType = {
    #general;
    #support;
    #feedback;
    #partnership;
  };

  public type ContactFormSubmission = {
    name : Text;
    email : Text;
    message : Text;
    inquiryType : InquiryType;
  };

  module ContactFormSubmission {
    public func compare(c1 : ContactFormSubmission, c2 : ContactFormSubmission) : Order.Order {
      Text.compare(c1.email, c2.email);
    };
  };

  let contactSubmissions = Map.empty<Text, ContactFormSubmission>();

  // Add a new certificate (for admin use)
  public shared ({ caller }) func addCertificate(certificate : Certificate) : async () {
    certificates.add(certificate.certificateCode, certificate);
  };

  // Verify a certificate by code
  public query ({ caller }) func verifyCertificate(code : Text) : async Certificate {
    switch (certificates.get(code)) {
      case (null) { Runtime.trap("Certificate not found") };
      case (?certificate) { certificate };
    };
  };

  // Submit contact form
  public shared ({ caller }) func submitContactForm(submission : ContactFormSubmission) : async () {
    contactSubmissions.add(submission.email, submission);
  };

  // Get all contact form submissions (for admin use)
  public query ({ caller }) func getAllContactFormSubmissions() : async [ContactFormSubmission] {
    contactSubmissions.values().toArray().sort();
  };
};
