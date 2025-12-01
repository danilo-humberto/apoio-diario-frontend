import { AntDesign, Feather } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { top, bottom } = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView className="flex-1 bg-background" behavior="padding">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
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
              <Text className="font-bold text-2xl">Criar Conta</Text>
              <Text className="text-lg tracking-wide">
                Preencha seus dados para começar
              </Text>
            </View>

            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <Feather name="user" size={20} color={"#7BB8F5"} />
                <Text className="font-semibold text-lg">Nome Completo</Text>
              </View>
              <TextInput
                keyboardType="default"
                placeholder="Seu nome"
                className="border rounded-md px-4 h-16 text-base border-slate-300"
                autoCorrect={false}
              />
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
              />
            </View>
            <View className="gap-1">
              <View className="gap-2">
                <View className="flex-row items-center gap-2">
                  <Feather name="lock" size={20} color={"#7BB8F5"} />
                  <Text className="font-semibold text-lg">Senha</Text>
                </View>
                <View className="relative border rounded-md h-16 border-slate-300 flex-row px-4 items-center">
                  <TextInput
                    secureTextEntry={!showPassword}
                    placeholder="•••••••••"
                    className="text-base placeholder:tracking-wider h-full flex-1"
                    autoCorrect={false}
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
              <Text className="text-slate-500 text-base">
                Mínimo de 6 caracteres
              </Text>
            </View>
            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <Feather name="lock" size={20} color={"#7BB8F5"} />
                <Text className="font-semibold text-lg">Confirmar Senha</Text>
              </View>
              <View className="relative border rounded-md h-16 border-slate-300 flex-row px-4 items-center">
                <TextInput
                  secureTextEntry={!showConfirmPassword}
                  placeholder="•••••••••"
                  className="text-base placeholder:tracking-wider h-full flex-1"
                  autoCorrect={false}
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

            <Link href={"/home"} asChild>
              <Pressable className="bg-primary mt-4 h-16 rounded-2xl items-center justify-center active:scale-95">
                <Text className="text-white font-bold text-lg">Entrar</Text>
              </Pressable>
            </Link>
            <View className="flex-row items-center gap-4 -mt-4">
              <View className="h-1 flex-1 bg-slate-200 rounded-full"></View>
              <Text>OU</Text>
              <View className="h-1 flex-1 bg-slate-200 rounded-full"></View>
            </View>
            <View className="items-center -mt-4">
              <Text className="text-slate-500 text-lg">Já tem uma conta?</Text>
              <Link
                href={"/login"}
                className="text-xl font-semibold underline active:scale-95"
              >
                Entrar
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
