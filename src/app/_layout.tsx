import { Stack } from "expo-router";
import "../styles/globals.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="welcome">
      <Stack.Screen name="welcome" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgetPassword" />
      <Stack.Screen name="confirmSentCode" />
      <Stack.Screen name="putRecoveryCode" />
      <Stack.Screen name="putNewPassword" />
    </Stack>
  );
}
