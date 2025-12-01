import { AntDesign, Feather } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
                  className={`${password.length >= 6 ? "text-green-600" : ""}`}
                >
                  Pelo menos 6 caracteres {password.length >= 6 && "✅"}
                </Text>
                <Text
                  className={`${password === confirmPassword && password.length > 1 ? "text-green-600" : ""}`}
                >
                  As senhas coincidem{" "}
                  {password === confirmPassword && password.length > 1 && "✅"}
                </Text>
              </View>
            </View>

            <Link href={"/home"} asChild>
              <Pressable className="bg-primary h-16 rounded-2xl items-center justify-center active:scale-95">
                <Text className="text-white font-bold text-lg">
                  Redefinir Senha
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PutNewPasswordScreen;
