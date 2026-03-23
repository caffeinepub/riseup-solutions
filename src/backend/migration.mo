import Map "mo:core/Map";
import Text "mo:core/Text";

module {
  type Certificate = {
    name : Text;
    courseName : Text;
    completionDate : Text;
    certificateCode : Text;
  };

  type ReviewStatus = {
    #pending;
    #approved;
    #rejected;
  };

  type Review = {
    id : Nat;
    name : Text;
    role : Text;
    courseOrProject : Text;
    stars : Nat;
    comment : Text;
    submittedAt : Text;
    status : ReviewStatus;
  };

  type InquiryType = {
    #general;
    #support;
    #feedback;
    #partnership;
  };

  type ContactFormSubmission = {
    name : Text;
    email : Text;
    message : Text;
    inquiryType : InquiryType;
    submittedAt : Text;
  };

  // Legacy type kept for stable variable compatibility on upgrade.
  // Do not remove — Motoko requires the old type to remain for safe upgrades.
  type ContactFormSubmissionV1 = {
    name : Text;
    email : Text;
    message : Text;
    inquiryType : InquiryType;
  };

  // Legacy type kept for stable variable compatibility on upgrade.
  // Do not remove — Motoko requires the old type to remain for safe upgrades.
  type OldActor = {
    certificates : Map.Map<Text, Certificate>;
    contactSubmissions : Map.Map<Text, ContactFormSubmissionV1>;
    contactSubmissionsV2 : Map.Map<Text, ContactFormSubmission>;
    submissionCounter : Nat;
  };

  type NewActor = {
    certificates : Map.Map<Text, Certificate>;
    contactSubmissions : Map.Map<Text, ContactFormSubmissionV1>;
    contactSubmissionsV2 : Map.Map<Text, ContactFormSubmission>;
    reviews : Map.Map<Nat, Review>;
    submissionCounter : Nat;
    reviewCounter : Nat;
  };

  public func run(old : OldActor) : NewActor {
    { old with reviews = Map.empty<Nat, Review>(); reviewCounter = 0 };
  };
};
