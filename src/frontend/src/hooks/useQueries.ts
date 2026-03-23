import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import type { Certificate, ContactFormSubmission, Review } from "../backend";
import { useActor } from "./useActor";

export function useVerifyCertificate() {
  const { actor } = useActor();
  const actorRef = useRef(actor);
  actorRef.current = actor;
  return useMutation<Certificate, Error, string>({
    mutationFn: async (code: string) => {
      if (!actorRef.current) throw new Error("Not connected to backend");
      return actorRef.current.verifyCertificate(code);
    },
  });
}

export function useSubmitContactForm() {
  const { actor, isFetching } = useActor();
  const actorRef = useRef(actor);
  actorRef.current = actor;
  const mutation = useMutation<void, Error, ContactFormSubmission>({
    mutationFn: async (submission: ContactFormSubmission) => {
      const currentActor = actorRef.current;
      if (!currentActor) throw new Error("Not connected to backend");
      await currentActor.submitContactForm(submission);
    },
  });
  return { ...mutation, isActorReady: !!actor && !isFetching };
}

export function useGetAllContactFormSubmissions() {
  const { actor } = useActor();
  return useQuery<ContactFormSubmission[], Error>({
    queryKey: ["contactSubmissions"],
    queryFn: async () => {
      if (!actor) throw new Error("Not connected to backend");
      return actor.getAllContactFormSubmissions();
    },
    enabled: !!actor,
  });
}

export function useGetApprovedReviews() {
  const { actor } = useActor();
  return useQuery<Review[], Error>({
    queryKey: ["approvedReviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApprovedReviews();
    },
    enabled: !!actor,
  });
}

export function useGetPendingReviews() {
  const { actor } = useActor();
  return useQuery<Review[], Error>({
    queryKey: ["pendingReviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingReviews();
    },
    enabled: !!actor,
  });
}
