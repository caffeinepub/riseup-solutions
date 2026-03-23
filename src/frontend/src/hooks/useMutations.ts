import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import type { ReviewInput } from "../backend";
import { useActor } from "./useActor";

export interface InternshipInput {
  title: string;
  description: string;
  duration: string;
  stipend: string;
  domain: string;
  applyLink: string;
  postedAt: string;
}

export function useSubmitReview() {
  const { actor } = useActor();
  const actorRef = useRef(actor);
  actorRef.current = actor;
  return useMutation<bigint, Error, ReviewInput>({
    mutationFn: async (review: ReviewInput) => {
      if (!actorRef.current) throw new Error("Not connected to backend");
      return actorRef.current.submitReview(review);
    },
  });
}

export function useApproveReview() {
  const { actor } = useActor();
  const actorRef = useRef(actor);
  actorRef.current = actor;
  const queryClient = useQueryClient();
  return useMutation<void, Error, bigint>({
    mutationFn: async (id: bigint) => {
      if (!actorRef.current) throw new Error("Not connected to backend");
      return actorRef.current.approveReview(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingReviews"] });
      queryClient.invalidateQueries({ queryKey: ["approvedReviews"] });
    },
  });
}

export function useRejectReview() {
  const { actor } = useActor();
  const actorRef = useRef(actor);
  actorRef.current = actor;
  const queryClient = useQueryClient();
  return useMutation<void, Error, bigint>({
    mutationFn: async (id: bigint) => {
      if (!actorRef.current) throw new Error("Not connected to backend");
      return actorRef.current.rejectReview(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingReviews"] });
      queryClient.invalidateQueries({ queryKey: ["approvedReviews"] });
    },
  });
}

export function useAddInternship() {
  const { actor } = useActor();
  const actorRef = useRef(actor);
  actorRef.current = actor;
  const queryClient = useQueryClient();
  return useMutation<bigint, Error, InternshipInput>({
    mutationFn: async (input: InternshipInput) => {
      const a = actorRef.current as any;
      if (!a) throw new Error("Not connected to backend");
      return a.addInternship(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internships"] });
    },
  });
}

export function useDeleteInternship() {
  const { actor } = useActor();
  const actorRef = useRef(actor);
  actorRef.current = actor;
  const queryClient = useQueryClient();
  return useMutation<void, Error, bigint>({
    mutationFn: async (id: bigint) => {
      const a = actorRef.current as any;
      if (!a) throw new Error("Not connected to backend");
      return a.deleteInternship(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internships"] });
    },
  });
}
