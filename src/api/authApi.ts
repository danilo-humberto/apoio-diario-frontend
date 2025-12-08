import * as SecureStore from "expo-secure-store";
import { Tokens, tokenStorageKeys } from "../types/auth";
import api from "./axios";

export type LoginResponse = {
  token?: string;
};

export const loginRequest = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", { email, password });
  return response.data as LoginResponse;
};

export const registerRequest = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const forgotPasswordRequest = async (email: string) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPasswordRequest = async (payload: {
  email: string;
  code: string;
  password: string;
}) => {
  const response = await api.post("/auth/reset-password", payload);
  return response.data;
};

export const verifyResetTokenRequest = async (email: string, code: string) => {
  const response = await api.post("/auth/validate-reset-token", {
    email,
    code,
  });
  return response.data;
};

export const storeTokens = async (tokens: Tokens) => {
  await SecureStore.setItemAsync(
    tokenStorageKeys.accessToken,
    tokens.accessToken
  );
  if (tokens.refreshToken) {
    await SecureStore.setItemAsync(
      tokenStorageKeys.refreshToken,
      tokens.refreshToken
    );
  }
};

export const clearTokens = async () => {
  await SecureStore.deleteItemAsync(tokenStorageKeys.accessToken);
  await SecureStore.deleteItemAsync(tokenStorageKeys.refreshToken);
};

export const getStoredTokens = async (): Promise<Tokens | null> => {
  const accessToken = await SecureStore.getItemAsync(
    tokenStorageKeys.accessToken
  );
  const refreshToken = await SecureStore.getItemAsync(
    tokenStorageKeys.refreshToken
  );
  if (!accessToken) return null;
  return { accessToken, refreshToken: refreshToken || undefined };
};
