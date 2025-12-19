import {
  useForgotPasswordMutation,
  useVerifyResetTokenMutation,
} from "@/src/hooks/useAuthMutations";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Pressable, Text, View } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Params = { email?: string };

const PutRecoveryCodeScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const params = useLocalSearchParams<Params>();
  const email = String(params.email ?? "");
  const [code, setCode] = useState("");
  const verifyMutation = useVerifyResetTokenMutation();
  const resendMutation = useForgotPasswordMutation();
  const [localError, setLocalError] = useState("");

  const handleNext = () => {
    if (!code || code.length < 6) {
      setLocalError("Digite o código de 6 dígitos enviado para seu e-mail.");
      return;
    }

    setLocalError("");

    verifyMutation.mutate(
      { email, code },
      {
        onSuccess: () => {
          router.push({
            pathname: "/(auth)/putNewPassword",
            params: { email, code },
          });
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || err?.message;
          setLocalError(msg);
        },
      }
    );
  };

  const handleResend = () => {
    resendMutation.mutate(email, {
      onSuccess: () => {
        setLocalError("Um novo código foi enviado para seu e-mail.");
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || err?.message;
        setLocalError(msg);
      },
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

        <View className="justify-center gap-8">
          <View className="text-start gap-2">
            <Text className="font-bold text-2xl">Verificar Código</Text>
            <Text className="text-lg tracking-wide">
              Digite o código de 6 dígitos enviado para seu e-mail
            </Text>
          </View>
          <OTPTextInput
            inputCount={6}
            handleTextChange={(val: string) => setCode(val)}
            tintColor="#cad5e2"
            offTintColor="#cad5e2"
            inputCellLength={1}
            containerStyle={{
              width: "100%",
              alignSelf: "center",
              justifyContent: "space-between",
            }}
            textInputStyle={{
              width: 43,
              height: 55,
              borderWidth: 1,
              borderRadius: 12,
            }}
          />

          <Pressable
            className="bg-primary h-16 rounded-2xl items-center justify-center active:scale-95"
            onPress={handleNext}
            disabled={verifyMutation.isPending}
            style={{ opacity: verifyMutation.isPending ? 0.6 : 1 }}
          >
            <Text className="text-white font-bold text-lg">
              {verifyMutation.isPending
                ? "Verificando..."
                : "Enviar Código de Verificação"}
            </Text>
          </Pressable>

          {localError ? (
            <Text className="text-red-500 -mt-2 text-center">{localError}</Text>
          ) : null}
          <View className="h-1 flex-1 bg-slate-200 rounded-full"></View>
          <View className="items-center -mt-4">
            <Text className="text-slate-500 text-lg">
              Não recebeu o código?
            </Text>
            <Pressable
              className="font-semibold text-lg"
              onPress={handleResend}
              disabled={resendMutation.isPending}
              style={{ opacity: resendMutation.isPending ? 0.6 : 1 }}
            >
              <Text>
                {resendMutation.isPending ? "Reenviando..." : "Reenviar código"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PutRecoveryCodeScreen;
