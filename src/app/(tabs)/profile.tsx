import Avatar from "@/components/Avatar";
import Button from "@/components/button/Button";
import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/theme/color";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const userName = user?.name;

  async function handleLogout() {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/login");
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Avatar */}
        <Avatar uri={user?.profileImage} size={80} />
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        {/* Logout */}
        <Button
          title="Logout"
          variant="outline"
          onPress={handleLogout}
          style={styles.logoutBtn}
          textStyle={{ color: Colors.error }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginTop: 14,
  },
  email: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 32,
  },
  logoutBtn: { width: "100%" },
});

export default Profile;
