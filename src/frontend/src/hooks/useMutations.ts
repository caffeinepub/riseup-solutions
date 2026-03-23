import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import type { ReviewInput } from "../backend";
import { useActor } from "./useActor";

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
