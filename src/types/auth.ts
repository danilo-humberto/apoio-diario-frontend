export type Tokens = {
  accessToken: string;
  refreshToken?: string;
};

export const tokenStorageKeys = {
  accessToken: "ACCESS_TOKEN",
  refreshToken: "REFRESH_TOKEN",
};
