import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RegisterChild = () => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: top + 16, paddingBottom: bottom + 16 }}
      className="px-6 bg-primary/20 flex-1"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Pressable
          className="bg-slate-200 w-12 h-12 rounded-md items-center justify-center"
          onPress={() => router.back()}
        >
          <AntDesign name="arrow-left" size={20} />
        </Pressable>
        <View className="mt-10">
          <Text className="font-bold text-3xl">Criar Perfil</Text>
          <Text>Vamos conhecer a criança</Text>
        </View>
        <View className="mt-10 gap-8">
          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <Feather name="user" size={20} color={"#7BB8F5"} />
              <Text className="font-semibold text-lg">Nome</Text>
            </View>
            <TextInput
              keyboardType="default"
              placeholder="Digite o nome"
              className="border rounded-md px-4 h-16 text-base border-slate-300"
              autoCorrect={false}
            />
          </View>
          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <Feather name="calendar" size={20} color={"#7BB8F5"} />
              <Text className="font-semibold text-lg">Idade</Text>
            </View>
            <TextInput
              keyboardType="number-pad"
              placeholder="Digite a idade"
              className="border rounded-md px-4 h-16 text-base border-slate-300"
              autoCorrect={false}
            />
          </View>
          <Pressable className="bg-primary min-w-full py-6 rounded-2xl active:scale-95">
            <Text className="text-center text-lg font-bold text-white">
              Salvar Perfil
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterChild;
