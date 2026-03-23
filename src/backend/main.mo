import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Migration "migration";
import List "mo:core/List";
import Order "mo:core/Order";

(with migration = Migration.run)
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

  // Legacy type kept for stable variable compatibility on upgrade.
  // Do not remove — Motoko requires the old type to remain for safe upgrades.
  type ContactFormSubmissionV1 = {
    name : Text;
    email : Text;
    message : Text;
    inquiryType : InquiryType;
  };

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
    submittedAt : Text;
  };

  module ContactFormSubmission {
    public func compare(c1 : ContactFormSubmission, c2 : ContactFormSubmission) : Order.Order {
      Text.compare(c1.email, c2.email);
    };
  };

  // Legacy stable var — preserved with original type so upgrade succeeds.
  let contactSubmissions = Map.empty<Text, ContactFormSubmissionV1>();

  // New stable var with submittedAt field.
  let contactSubmissionsV2 = Map.empty<Text, ContactFormSubmission>();

  // Review System
  public type ReviewStatus = {
    #pending;
    #approved;
    #rejected;
  };

  public type Review = {
    id : Nat;
    name : Text;
    role : Text;
    courseOrProject : Text;
    stars : Nat;
    comment : Text;
    submittedAt : Text;
    status : ReviewStatus;
  };

  public type ReviewInput = {
    name : Text;
    role : Text;
    courseOrProject : Text;
    stars : Nat;
    comment : Text;
    submittedAt : Text;
  };

  module Review {
    public func compare(r1 : Review, r2 : Review) : Order.Order {
      Nat.compare(r1.id, r2.id);
    };
  };

  let reviews = Map.empty<Nat, Review>();

  var submissionCounter : Nat = 0;
  var reviewCounter = 0;

  public shared func addCertificate(certificate : Certificate) : async () {
    certificates.remove(certificate.certificateCode);
    certificates.add(certificate.certificateCode, certificate);
  };

  public query func verifyCertificate(code : Text) : async Certificate {
    switch (certificates.get(code)) {
      case (null) { Runtime.trap("Certificate not found") };
      case (?certificate) { certificate };
    };
  };

  public shared func submitContactForm(submission : ContactFormSubmission) : async () {
    submissionCounter += 1;
    let key = submission.email # "_" # submissionCounter.toText();
    contactSubmissionsV2.add(key, submission);
  };

  public query func getAllContactFormSubmissions() : async [ContactFormSubmission] {
    contactSubmissionsV2.values().toArray().sort();
  };

  // Submit a new review (always pending)
  public shared ({ caller }) func submitReview(review : ReviewInput) : async Nat {
    if (review.stars < 1 or review.stars > 5) {
      Runtime.trap("Stars must be between 1 and 5");
    };
    reviewCounter += 1;
    let newReview : Review = {
      id = reviewCounter;
      name = review.name;
      role = review.role;
      courseOrProject = review.courseOrProject;
      stars = review.stars;
      comment = review.comment;
      submittedAt = review.submittedAt;
      status = #pending;
    };
    reviews.add(reviewCounter, newReview);
    reviewCounter;
  };

  // Approve a review (admin)
  public shared ({ caller }) func approveReview(id : Nat) : async () {
    switch (reviews.get(id)) {
      case (null) { Runtime.trap("Review not found") };
      case (?review) {
        let updatedReview = { review with status = #approved };
        reviews.add(id, updatedReview);
      };
    };
  };

  // Reject a review (admin)
  public shared ({ caller }) func rejectReview(id : Nat) : async () {
    switch (reviews.get(id)) {
      case (null) { Runtime.trap("Review not found") };
      case (?review) {
        let updatedReview = { review with status = #rejected };
        reviews.add(id, updatedReview);
      };
    };
  };

  // Get all approved reviews (public)
  public query ({ caller }) func getApprovedReviews() : async [Review] {
    reviews.values().toArray().filter(
      func(r) {
        switch (r.status) {
          case (#approved) { true };
          case (_) { false };
        };
      }
    ).sort();
  };

  // Get all pending reviews (admin)
  public query ({ caller }) func getPendingReviews() : async [Review] {
    reviews.values().toArray().filter(
      func(r) {
        switch (r.status) {
          case (#pending) { true };
          case (_) { false };
        };
      }
    ).sort();
  };

  // Get all reviews regardless of status (admin)
  public query ({ caller }) func getAllReviews() : async [Review] {
    reviews.values().toArray().sort();
  };
};

