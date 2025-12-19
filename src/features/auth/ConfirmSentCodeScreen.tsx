import { Feather } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Params = { email?: string };

const ConfirmSentCodeScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const params = useLocalSearchParams<Params>();
  return (
    <View
      className="flex-1 items-center justify-center bg-green-50 gap-4 px-6"
      style={{ paddingTop: top, paddingBottom: bottom }}
    >
      <View className="bg-green-200 rounded-full p-2 items-center justify-center">
        <Feather name="check" size={80} />
      </View>

      <Text className="font-semibold text-2xl">Código Enviado!</Text>
      <Text className="text-lg text-slate-500 text-center">
        Enviamos um código de 6 dígitos para{" "}
        <Text className="font-semibold text-black">{params.email}</Text>
      </Text>

      <View className="bg-white py-4 px-6 items-center rounded-xl shadow-black shadow-md gap-2">
        <Text className="text-lg">📧 Verifique sua caixa de entrada</Text>
        <Text className="text-center text-slate-500 text-lg">
          O código pode levar alguns minutos para chegar. Não esqueça de
          verificar a pasta de spam.
        </Text>
      </View>

      <Pressable
        className="bg-primary h-16 rounded-2xl mt-4 w-full items-center justify-center active:scale-95"
        onPress={() =>
          router.push({
            pathname: "/(auth)/putRecoveryCode",
            params: { email: params.email },
          })
        }
      >
        <Text className="text-white font-bold text-lg">Inserir Código</Text>
      </Pressable>

      <Link
        href={"/(auth)/forgetPassword"}
        className="text-slate-500 text-xl mt-2 active:scale-95"
      >
        Tentar outro e-mail
      </Link>
    </View>
  );
};

export default ConfirmSentCodeScreen;
