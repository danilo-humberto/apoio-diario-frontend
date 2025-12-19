import { useResetPasswordMutation } from "@/src/hooks/useAuthMutations";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PutNewPasswordScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const params = useLocalSearchParams<{ email: string; code: string }>();
  const email = String(params?.email);
  const code = String(params?.code);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const resetMutation = useResetPasswordMutation();

  const isPasswordLongEnough = password.length >= 6;
  const isPasswordMatch = password === confirmPassword && password.length > 1;

  const canSubmit = useMemo(() => {
    return (
      email.length > 0 &&
      code.length > 0 &&
      isPasswordLongEnough &&
      isPasswordMatch &&
      !resetMutation.isPending
    );
  }, [
    email,
    code,
    isPasswordLongEnough,
    isPasswordMatch,
    resetMutation.isPending,
  ]);

  const handleReset = () => {
    if (password !== confirmPassword) {
      setLocalError("As senhas devem ser iguais.");
      return;
    }

    if (password.length < 6) {
      setLocalError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setLocalError("");

    resetMutation.mutate(
      { email, code, password },
      {
        onSuccess: () => {
          router.push({ pathname: "/(auth)/login" });
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || err?.message;
          setLocalError(msg);
        },
      }
    );
  };
  return (
    <KeyboardAvoidingView className="flex-1 bg-background" behavior="padding">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: bottom + 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          className="px-6 bg-background flex-1 gap-24"
          style={{ paddingTop: top + 16, paddingBottom: bottom + 16 }}
        >
          <Pressable
            className="bg-slate-200 w-12 h-12 rounded-md items-center justify-center"
            onPress={() => router.back()}
          >
            <AntDesign name="arrow-left" size={20} />
          </Pressable>

          <View className=" justify-center gap-8">
            <View className="text-start gap-2">
              <Text className="font-bold text-2xl">Nova Senha</Text>
              <Text className="text-lg tracking-wide">
                Crie uma senha segura para sua conta
              </Text>
            </View>

            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <Feather name="lock" size={20} color={"#7BB8F5"} />
                <Text className="font-semibold text-lg">Nova Senha</Text>
              </View>
              <View className="relative border rounded-md h-16 border-slate-300 flex-row px-4 items-center">
                <TextInput
                  secureTextEntry={!showPassword}
                  placeholder="•••••••••"
                  className="text-base placeholder:tracking-wider h-full flex-1"
                  autoCorrect={false}
                  value={password}
                  onChangeText={setPassword}
                />

                <Pressable className="active:scale-95">
                  <Feather
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color={"#7BB8F5"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                </Pressable>
              </View>
            </View>

            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <Feather name="lock" size={20} color={"#7BB8F5"} />
                <Text className="font-semibold text-lg">
                  Confirmar Nova Senha
                </Text>
              </View>
              <View className="relative border rounded-md h-16 border-slate-300 flex-row px-4 items-center">
                <TextInput
                  secureTextEntry={!showConfirmPassword}
                  placeholder="•••••••••"
                  className="text-base placeholder:tracking-wider h-full flex-1"
                  autoCorrect={false}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />

                <Pressable className="active:scale-95">
                  <Feather
                    name={showConfirmPassword ? "eye" : "eye-off"}
                    size={20}
                    color={"#7BB8F5"}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </Pressable>
              </View>
            </View>

            <View className="bg-white py-4 px-6 rounded-xl shadow-black shadow-md gap-2">
              <Text className="text-lg">✅ Sua senha deve ter:</Text>
              <View className="gap-2">
                <Text
                  className={`${isPasswordLongEnough ? "text-green-600" : ""}`}
                >
                  Pelo menos 6 caracteres {isPasswordLongEnough && "✅"}
                </Text>
                <Text className={`${isPasswordMatch ? "text-green-600" : ""}`}>
                  As senhas coincidem {isPasswordMatch && "✅"}
                </Text>
              </View>
            </View>

            <Pressable
              className="bg-primary h-16 rounded-2xl items-center justify-center active:scale-95"
              onPress={handleReset}
              disabled={!canSubmit}
              style={{ opacity: canSubmit ? 1 : 0.6 }}
            >
              <Text className="text-white font-bold text-lg">
                {resetMutation.isPending ? "Redefinindo..." : "Redefinir Senha"}
              </Text>
            </Pressable>

            {localError && (
              <Text className="text-red-500 text-center -mt-2">
                {localError}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PutNewPasswordScreen;
