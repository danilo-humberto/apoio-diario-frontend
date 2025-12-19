import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

const WelcomeScreen = () => {
  return (
    <View className="bg-background flex-1 items-center justify-center gap-2 px-6">
      <View className="bg-primary rounded-full p-4">
        <Image
          source={require("../../assets/images/logo.png")}
          className="w-28 h-28"
          resizeMode="contain"
        />
      </View>
      <Text className="text-black font-bold text-4xl">Bem-vindo</Text>
      <Text className="text-black/80 text-lg">
        Rotina simples e organizada!
      </Text>
      <Link href={"/(auth)/login"} asChild>
        <Pressable className="text-center mt-10 bg-primary w-full py-6 rounded-2xl active:scale-95">
          <Text className="text-center text-lg text-white font-bold">
            Começar
          </Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default WelcomeScreen;
