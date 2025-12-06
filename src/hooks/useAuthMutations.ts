import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../providers/AuthProvider";

export const useLoginMutation = () => {
  const { signIn } = useAuth();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return signIn(email, password);
    },
  });
};

export const useRegisterMutation = () => {
  const { signUp } = useAuth();

  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      return signUp(payload);
    },
  });
};
