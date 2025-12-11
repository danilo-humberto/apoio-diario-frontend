import React, { useEffect, useState } from "react";
import { Text, Pressable, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { router } from "expo-router";
import { googleLoginRequest, storeTokens } from "../../api/authApi";

WebBrowser.maybeCompleteAuthSession();

export const GoogleAuthButton = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.ANDROID_CLIENT_ID,
    webClientId: process.env.WEB_CLIENT_ID,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  const handleSignInWithGoogle = async () => {
    if (response?.type === "success") {
      setIsLoading(true);
      try {
        const { authentication } = response;
        const tokenToSend = authentication?.accessToken || authentication?.idToken;

        if (tokenToSend) {
          const data = await googleLoginRequest(tokenToSend);

          if (data.token) {
            await storeTokens({ accessToken: data.token });
            router.replace("/home");
          }
        }
      } catch (error) {
        console.error(error);
        alert("Falha ao autenticar com Google");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Pressable
      className="flex-row items-center justify-center gap-3 bg-white border border-slate-200 h-16 rounded-2xl active:scale-95 mt-4"
      onPress={() => promptAsync()}
      disabled={!request || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <>
          <AntDesign name="google" size={24} color="black" />
          <Text className="font-semibold text-lg text-slate-700">
            Continuar com Google
          </Text>
        </>
      )}
    </Pressable>
  );
};