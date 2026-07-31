import { Colors } from "@/theme/color";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { User } from "../types";

interface UserListItemProps {
  user: User;
  onPress: (user: User) => void;
}

const UserListItem = ({ user, onPress }: UserListItemProps) => {
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  const avatarColors = ["#8B5CF6", "#06B6D4"];

  const avatarColor = avatarColors[user.id % avatarColors.length];
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => onPress(user)}
      activeOpacity={0.7}
    >
      {/* avatar */}
      <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  email: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});

export default UserListItem;
