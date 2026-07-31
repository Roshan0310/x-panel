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

  const supportUrl = `https://reqres.in/#support-heading`;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="chevron-back"
              size={24}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>

          <View style={{ width: 24 }} />
        </View>

        <View style={styles.hero}>
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: avatarColor,
              },
            ]}
          >
            <Text style={styles.avatarText}>{initials}</Text>
          </View>

          <Text style={styles.heroName}>
            {user.firstName} {user.lastName}
          </Text>

          <Text style={styles.heroEmail}>{user.email}</Text>
        </View>

        {/* card */}
        <View style={styles.content}>
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
        </View>
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
    justifyContent: "center",
    alignItems: "center",
  },

  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },

  hero: {
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 45,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: Colors.white,
  },

  avatarText: {
    fontSize: 34,
    fontWeight: "700",
    color: Colors.white,
  },

  heroName: {
    marginTop: 16,
    fontSize: 28,
    fontWeight: "700",
    color: Colors.textPrimary,
  },

  heroEmail: {
    marginTop: 6,
    fontSize: 15,
    color: Colors.primary,
  },

  content: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: -25,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 30,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 18,
  },

  infoRow: {
    flexDirection: "row",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  infoIcon: {
    marginTop: 3,
    marginRight: 14,
  },

  infoText: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.textPrimary,
  },

  infoLink: {
    fontSize: 15,
    color: Colors.primary,
  },
});
export default UserDetails;
