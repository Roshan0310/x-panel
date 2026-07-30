import { useAuth } from "@/context/AuthContext";
import dashboardData from "@/data/dashboard.json";
import { Colors } from "@/theme/color";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        {/* toolbar */}
        <View>
          <TouchableOpacity>
            <Feather name="menu" size={24} color="black" />
          </TouchableOpacity>
          <View>
            <TouchableOpacity>
              <Ionicons name="notifications" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <Image source={{ uri: user?.profileImage }} />
          </View>
        </View>

        <View>
          <Text>Hello,</Text>
          <Text>{user?.name}</Text>
        </View>

        {/* Search Input */}
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/users")}
          activeOpacity={0.8}
        >
          <Ionicons name="search-outline" size={18} color={Colors.textMuted} />
          <Text>Search users...</Text>
        </TouchableOpacity>

        <View>
          <View>
            {dashboardData.stats.map((item) => (
              <Text key={item.id}>{item.value}</Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
};
export default Dashboard;
