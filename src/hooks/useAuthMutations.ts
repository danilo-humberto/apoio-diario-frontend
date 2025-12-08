import { useMutation } from "@tanstack/react-query";
import {
  forgotPasswordRequest,
  resetPasswordRequest,
  verifyResetTokenRequest,
} from "../api/authApi";
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

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      return forgotPasswordRequest(email);
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: async (payload: {
      email: string;
      code: string;
      password: string;
    }) => {
      return resetPasswordRequest(payload);
    },
  });
};

export const useVerifyResetTokenMutation = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; code: string }) => {
      return verifyResetTokenRequest(payload.email, payload.code);
    },
  });
};
