import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import usersData from "@/data/users.json";
import { Colors } from "@/theme/color";
import { User } from "@/types";

const allUsers: User[] = usersData as User[];

// A single info row in the "User Information" card
function InfoRow({
  icon,
  label,
  value,
  isLink = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  isLink?: boolean;
}) {
  return (
    <View style={styles.infoRow}>
      <Ionicons
        name={icon}
        size={18}
        color={Colors.textMuted}
        style={styles.infoIcon}
      />
      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>{label}</Text>
        {isLink ? (
          <TouchableOpacity onPress={() => Linking.openURL(value)}>
            <Text style={styles.infoLink}>{value}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.infoValue}>{value}</Text>
        )}
      </View>
    </View>
  );
}

const UserDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  // Find the user by ID from the local data
  const user = allUsers.find((u) => String(u.id) === id);

  if (!user) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.notFound}>
          <Text>User not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  const avatarColors = ["#8B5CF6", "#06B6D4"];

  const avatarColor = avatarColors[user.id % avatarColors.length];

  // Generate a support URL from the user's name
  const supportUrl = `https://reqres.in/#support-heading`;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Header bar ── */}
        <View style={styles.headerBar}>
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="ellipsis-vertical"
              size={22}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>
        </View>

        {/* ── Hero section (lavender bg) ── */}
        <View style={styles.hero}>
          {/* avatar */}
          <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.heroName}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.heroEmail}>{user.email}</Text>
        </View>

        {/* ── User Information card ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>User Information</Text>

          <InfoRow
            icon="person-outline"
            label="First Name"
            value={user.firstName}
          />
          <InfoRow
            icon="person-outline"
            label="Last Name"
            value={user.lastName}
          />
          <InfoRow icon="mail-outline" label="Email" value={user.email} />
          <InfoRow
            icon="link-outline"
            label="Support URL"
            value={supportUrl}
            isLink
          />
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // Header bar
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: Colors.white,
  },

  avatarText: {
    fontSize: 36,
    fontWeight: "700",
    color: Colors.white,
  },

  // Hero
  hero: {
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 32,
  },
  heroName: {
    marginTop: 14,
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  heroEmail: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.textLink,
  },

  // Info card
  card: {
    marginHorizontal: 16,
    marginTop: -16,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 16,
  },

  // Info rows
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: "500",
  },
  infoLink: {
    fontSize: 14,
    color: Colors.textLink,
    textDecorationLine: "underline",
  },
});

export default UserDetails;
