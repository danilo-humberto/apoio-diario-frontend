import { Stack } from "expo-router";
import "../styles/globals.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="welcome">
      <Stack.Screen name="welcome" />
    </Stack>
  );
}
