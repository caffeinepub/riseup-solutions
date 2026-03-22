import { useMutation } from "@tanstack/react-query";
import type { Certificate, ContactFormSubmission } from "../backend";
import { useActor } from "./useActor";

export function useVerifyCertificate() {
  const { actor } = useActor();
  return useMutation<Certificate, Error, string>({
    mutationFn: async (code: string) => {
      if (!actor) throw new Error("Not connected to backend");
      return actor.verifyCertificate(code);
    },
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation<void, Error, ContactFormSubmission>({
    mutationFn: async (submission: ContactFormSubmission) => {
      if (!actor) throw new Error("Not connected to backend");
      return actor.submitContactForm(submission);
    },
  });
}
