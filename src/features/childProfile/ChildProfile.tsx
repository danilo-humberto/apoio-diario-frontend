import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChildProfile = () => {
  const { top, bottom } = useSafeAreaInsets();
  const profiles = [];
  return (
    <View
      className="px-6 items-center"
      style={{ paddingTop: top + 16, paddingBottom: bottom + 16 }}
    >
      <Text className="font-semibold text-3xl mb-3 mt-24">Bem-vindo(a)!</Text>
      <Text className="text-xl">Crie o primeiro perfil para começar</Text>

      {profiles.length > 0 ? (
        <View></View>
      ) : (
        <View className="mt-24 items-center gap-8">
          <View className="w-28 h-28 bg-primary/30 rounded-full items-center justify-center">
            <Ionicons name="person-add-outline" size={60} color={"#7BB8F5"} />
          </View>
          <Text className="text-xl">Nenhum perfil criado</Text>
          <Text className="text-center text-xl">
            Adicione o perfil da criança para começar a organizar a rotina
            diária
          </Text>

          <Link asChild href={"/(auth)/registerChild"}>
            <Pressable className="bg-primary min-w-full py-6 rounded-2xl active:scale-95">
              <Text className="text-center text-lg font-bold text-white">
                Criar Primeiro Perfil
              </Text>
            </Pressable>
          </Link>
        </View>
      )}
    </View>
  );
};

export default ChildProfile;
