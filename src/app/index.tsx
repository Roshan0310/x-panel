import { Redirect } from "expo-router";

import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/theme/color";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return token ? (
    <Redirect href="/(tabs)/dashboard" />
  ) : (
    <Redirect href="/login" />
  );
}
