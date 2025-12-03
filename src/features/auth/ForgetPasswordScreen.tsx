import { AntDesign, Feather } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ForgetPasswordScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const [email, setEmail] = useState("");

  const handleSend = () => {
    router.push({
      pathname: "/confirmSentCode",
      params: { email },
    });
  };
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
            <Text className="font-bold text-2xl">Esqueci minha Senha</Text>
            <Text className="text-lg tracking-wide">
              Digite seu e-mail e enviaremos um código de 6 dígitos para
              redifinir sua senha
            </Text>
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

          <View className="border border-slate-300 p-4 rounded-md gap-2">
            <Text className="text-lg">💡 Dica de Segurança</Text>
            <Text className="text-lg text-slate-500">
              Certifique-se de usar o mesmo e-mail que você cadastrou na sua
              conta.
            </Text>
          </View>

          <Pressable
            className="bg-primary h-16 rounded-2xl items-center justify-center active:scale-95"
            onPress={handleSend}
          >
            <Text className="text-white font-bold text-lg">
              Enviar Código de Verificação
            </Text>
          </Pressable>
          <View className="flex-row items-center gap-4 -mt-4">
            <View className="h-1 flex-1 bg-slate-200 rounded-full"></View>
            <Text>OU</Text>
            <View className="h-1 flex-1 bg-slate-200 rounded-full"></View>
          </View>
          <View className="items-center -mt-4">
            <Text className="text-slate-500 text-lg">Não tem uma conta?</Text>
            <Link
              href={"/register"}
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

export default ForgetPasswordScreen;
