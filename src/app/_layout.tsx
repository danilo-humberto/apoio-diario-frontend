import { Stack } from "expo-router";
import { AuthProvider } from "../providers/AuthProvider";
import QueryProvider from "../providers/QueryProvider";
import "../styles/globals.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <QueryProvider>
        <Stack
          screenOptions={{ headerShown: false, animation: "slide_from_right" }}
          initialRouteName="welcome"
        >
          <Stack.Screen name="welcome" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)" />
        </Stack>
      </QueryProvider>
    </AuthProvider>
  );
}
