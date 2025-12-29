import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgetPassword" />
      <Stack.Screen name="confirmSentCode" />
      <Stack.Screen name="putRecoveryCode" />
      <Stack.Screen name="putNewPassword" />
      <Stack.Screen name="childProfile" />
      <Stack.Screen name="registerChild" />
    </Stack>
  );
}
