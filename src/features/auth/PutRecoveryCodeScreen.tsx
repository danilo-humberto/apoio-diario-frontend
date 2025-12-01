import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { KeyboardAvoidingView, Pressable, Text, View } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PutRecoveryCodeScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
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

          <Link href={"/putNewPassword"} asChild>
            <Pressable className="bg-primary h-16 rounded-2xl items-center justify-center active:scale-95">
              <Text className="text-white font-bold text-lg">
                Enviar Código de Verificação
              </Text>
            </Pressable>
          </Link>
          <View className="h-1 flex-1 bg-slate-200 rounded-full"></View>
          <View className="items-center -mt-4">
            <Text className="text-slate-500 text-lg">
              Não recebeu o código?
            </Text>
            <Text className="font-semibold text-lg">Reenviar código</Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PutRecoveryCodeScreen;
