import { Colors } from "@/theme/color";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Favorites = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <Text style={styles.text}>Favorites</Text>
        <Text style={styles.sub}>Coming soon</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginTop: 12,
  },
  sub: { fontSize: 14, color: Colors.textMuted, marginTop: 4 },
});

export default Favorites;
