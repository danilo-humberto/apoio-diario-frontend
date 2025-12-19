import { useLoginMutation } from "@/src/hooks/useAuthMutations";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLoginMutation();

  const handleSubmit = () => {
    if (!email.trim() || !password) {
      return;
    }

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          router.replace("/(auth)/childProfile");
        },
        onError: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  const errorMessage =
    (loginMutation.error as any)?.response?.data?.message ||
    (loginMutation.error as any)?.message ||
    null;
  return (
    <KeyboardAvoidingView className="flex-1 bg-background" behavior="padding">
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
            <Text className="font-bold text-2xl">Entrar</Text>
            <Text className="text-lg tracking-wide">Acesse sua conta</Text>
          </View>

          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <Feather name="mail" size={20} color={"#7BB8F5"} />
              <Text className="font-semibold text-lg">E-mail</Text>
            </View>
            <TextInput
              keyboardType="email-address"
              placeholder="seu@email.com"
              className="border rounded-md px-4 h-16 text-base border-slate-300"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <Feather name="lock" size={20} color={"#7BB8F5"} />
              <Text className="font-semibold text-lg">Senha</Text>
            </View>
            <View>
              <TextInput
                secureTextEntry={!showPassword}
                placeholder="•••••••••"
                className="border rounded-md px-4 h-16 text-base border-slate-300 relative placeholder:tracking-wider"
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
              />

              <Pressable>
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color={"#7BB8F5"}
                  className="absolute -top-[2.6rem] right-4"
                  onPress={() => setShowPassword(!showPassword)}
                />
              </Pressable>
            </View>
          </View>
          <Link href={"/forgetPassword"} asChild>
            <Pressable className="active:scale-95">
              <Text className="text-slate-500 text-lg underline">
                Esqueci minha senha
              </Text>
            </Pressable>
          </Link>

          <Pressable
            className="bg-primary mt-4 h-16 rounded-2xl items-center justify-center active:scale-95"
            onPress={handleSubmit}
            disabled={loginMutation.isPending}
            style={{ opacity: loginMutation.isPending ? 0.6 : 1 }}
          >
            <Text className="text-white font-bold text-lg">
              {loginMutation.isPending ? "Entrando..." : "Entrar"}
            </Text>
          </Pressable>
          {loginMutation.isError && errorMessage ? (
            <Text className="text-red-500 text-center -mt-2">
              {errorMessage}
            </Text>
          ) : null}
          <View className="flex-row items-center gap-4 -mt-4">
            <View className="h-1 flex-1 bg-slate-200 rounded-full"></View>
            <Text>OU</Text>
            <View className="h-1 flex-1 bg-slate-200 rounded-full"></View>
          </View>
          <View className="items-center -mt-4">
            <Text className="text-slate-500 text-lg">Não tem uma conta?</Text>
            <Link
              href={"/(auth)/register"}
              className="text-xl font-semibold underline active:scale-95"
            >
              Criar conta
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
