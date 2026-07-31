import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Status, User } from "../../types";

import Avatar from "@/components/Avatar";
import StatusCard from "@/components/cards/StatusCard";
import UserListItem from "@/components/UserListItem";
import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/theme/color";
import dashboardData from "../../data/dashboard.json";
import usersData from "../../data/users.json";

const stats: Status[] = dashboardData.stats as Status[];
const users: User[] = usersData as User[];
const recentUsers = users.slice(0, 4);

export default function DashboardScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const userName = user?.name || "userName";

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity>
            <Ionicons
              name="menu-outline"
              size={26}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>
          <View style={styles.topRight}>
            <TouchableOpacity style={styles.bellBtn}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={Colors.textPrimary}
              />
              <View style={styles.badge} />
            </TouchableOpacity>
            <Avatar uri={user?.profileImage} size={38} />
          </View>
        </View>
        <View style={styles.greetingBox}>
          <Text style={styles.greetingSmall}>Hello,</Text>
          <Text style={styles.greetingLarge}>{userName},</Text>
        </View>
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => router.push("/(tabs)/users")}
          activeOpacity={0.8}
        >
          <Ionicons name="search-outline" size={18} color={Colors.textMuted} />
          <Text style={styles.searchPlaceholder}>Search users...</Text>
        </TouchableOpacity>
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <StatusCard stat={stats[0]} />
            <StatusCard stat={stats[1]} />
          </View>
          <View style={styles.statsRow}>
            <StatusCard stat={stats[2]} />
            <StatusCard stat={stats[3]} />
          </View>
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Users</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/users")}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.userList}>
          {recentUsers.map((u) => (
            <UserListItem
              key={u.id}
              user={u}
              onPress={() => router.push(`/(tabs)/users/${u.id}`)}
            />
          ))}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  topRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bellBtn: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
  },
  greetingBox: {
    marginBottom: 16,
  },
  greetingSmall: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  greetingLarge: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
    gap: 10,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  statsGrid: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: "row",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  viewAll: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
  },
  userList: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
});
