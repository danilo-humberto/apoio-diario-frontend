import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

const WelcomeScreen = () => {
  return (
    <View className="bg-background flex-1 items-center justify-center gap-2">
      <View className="bg-primary rounded-full p-4">
        <Image
          source={require("../../assets/images/logo.png")}
          className="w-28 h-28"
          resizeMode="contain"
        />
      </View>
      <Text className="text-black/80">Rotina simples e organizada!</Text>
      <Link href={"/login"} className="mt-10 bg-primary w-5/6 py-6 rounded-2xl">
        <Text className="text-center text-lg">Começar</Text>
      </Link>
    </View>
  );
};

export default WelcomeScreen;
